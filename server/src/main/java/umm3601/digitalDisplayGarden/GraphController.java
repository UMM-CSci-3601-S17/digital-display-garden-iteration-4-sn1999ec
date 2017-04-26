package umm3601.digitalDisplayGarden;


import com.mongodb.MongoClient;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.mongodb.client.*;
import com.mongodb.util.JSON;
import org.bson.Document;
import java.util.Iterator;
import java.io.IOException;
import java.util.*;

public class GraphController {

    MongoClient mongoClient = new MongoClient(); // Defaults!
    private final MongoCollection<Document> plantCollection;
    private final MongoCollection<Document> graphInfoCollection;
    String dbName;

    public GraphController(String databaseName) throws IOException {
        // Set up our server address
        // (Default host: 'localhost', default port: 27017)
        // ServerAddress testAddress = new ServerAddress();

        // Try connecting to the server
        //MongoClient mongoClient = new MongoClient(testAddress, credentials);

        // Try connecting to a database
        MongoDatabase db = mongoClient.getDatabase(databaseName);

        plantCollection = db.getCollection("plants");
        graphInfoCollection = db.getCollection("graphData");
        dbName = databaseName;

    }


    public String postData(String uploadId) {
        Document filterDoc = new Document();
        filterDoc.append("uploadId", uploadId);

        FindIterable matchingPlants = plantCollection.find(filterDoc);

        Iterator iterator = matchingPlants.iterator();
        graphInfoCollection.drop();

        while (iterator.hasNext()) {
            Document result = (Document) iterator.next();
            int total = 0;
            int likes = 0;
            int dislikes = 0;
            Document out = new Document();

            String name = (String) result.get("cultivar");
            List<Document> ratings = (List<Document>) ((Document) result.get("metadata")).get("ratings");
            int view = (int) ((Document) result.get("metadata")).get("pageViews");
            String id = (String) result.get("id");
            for (Document rating : ratings) {
                if (rating.get("like").equals(true)) {
                    total++;
                    likes++;
                } else if (rating.get("like").equals(false)) {
                    total--;
                    dislikes++;
                }
            }

            out.append("cultivar", name);
            out.append("rating", total);
            out.append("pageViews", view);
            out.append("likes", likes);
            out.append("dislikes", dislikes);
            out.append("id", id);
            out.append("gardenLocation", result.get("gardenLocation"));
            out.append("uploadId", uploadId);

            graphInfoCollection.insertOne(out);

        }


        return "posted";
    }

    public String getLikeDataForAllPlants(String uploadId) {
        ArrayList<String> beds = new ArrayList<>();
        FindIterable<Document> allData = graphInfoCollection.find();
        Iterator iterator = allData.iterator();

        while (iterator.hasNext()) {
            Document current = (Document) iterator.next();
            String gardenLocation = (String) current.get("gardenLocation");

            if (!beds.contains((gardenLocation))) {
                beds.add(gardenLocation);
            }
        }

        Object[][] dataTable = new Object[beds.size() + 1][4];

        dataTable[0][0] = "Bed";
        dataTable[0][1] = "Likes";
        dataTable[0][2] = "Dislikes";
        dataTable[0][3] = "Visits";
        int dataCounter = 1;
        for (int i = 0; i < beds.size(); i++) {
            FindIterable<Document> currentBedMembers = graphInfoCollection.find(new Document("gardenLocation", beds.get(i)));
            iterator = currentBedMembers.iterator();
            dataTable[dataCounter][0] = beds.get(i);
            Integer currentLikes = 0;
            Integer currentViews = 0;
            Integer currentDislikes = 0;
            while(iterator.hasNext()){
                Document current = (Document) iterator.next();
                currentLikes += (Integer) current.get("likes");
                currentDislikes += (Integer) current.get("dislikes");
                currentViews += (Integer) current.get("pageViews");
            }
            dataTable[dataCounter][1] = currentLikes;
            dataTable[dataCounter][2] = currentDislikes;
            dataTable[dataCounter][3] = currentViews;
            dataCounter++;
        }
        return makeJSON(dataTable);
    }

    public String getDataForOneBed(String gardenLocation){
        Document filter = new Document();
        filter.append("gardenLocation", gardenLocation);
        FindIterable<Document> matchingInfo = graphInfoCollection.find(filter);
        System.out.println(JSON.serialize(matchingInfo));
        Iterator iterator = matchingInfo.iterator();
        ArrayList<Document> info = new ArrayList<>();
        System.out.println("does it have next? " + iterator.hasNext());

        while(iterator.hasNext()){
            Document current = (Document) iterator.next();
            info.add(current);
        }

        Object[][] dataTable = new Object[info.size() + 1][4];
        dataTable[0][0] = "Cultivar";
        dataTable[0][1] = "Likes";
        dataTable[0][2] = "Dislikes";
        dataTable[0][3] = "Views";
        int dataCounter = 1;
        for(int i = 0; i < info.size(); i++){
            dataTable[dataCounter][0] = info.get(i).get("cultivar");
            dataTable[dataCounter][1] = info.get(i).get("likes");
            dataTable[dataCounter][2] = info.get(i).get("dislikes");
            dataTable[dataCounter][3] = info.get(i).get("pageViews");
            dataCounter++;
        }
        return makeJSON(dataTable);
    }

    //taken from revolverenguardia
    public String makeJSON(Object[][] in) {
        JsonArray outerArray = new JsonArray();
        for (int i = 0; i < in.length; i++) {
            JsonArray innerArray = new JsonArray();
            for (int j = 0; j < in[i].length; j++) {
                Object a = in[i][j];
                Class objectClass = a.getClass();
                if (objectClass == String.class) {
                    innerArray.add(in[i][j].toString());
                } else if (Number.class.isAssignableFrom(objectClass)) {
                    innerArray.add((Number) in[i][j]);
                } else if (objectClass == JsonElement.class) {
                    innerArray.add((JsonElement) in[i][j]);
                } else {
                    throw new RuntimeException("WHAT ARE YOU");
                }
            }

            outerArray.add(innerArray);
        }
        return outerArray.toString();
    }

}
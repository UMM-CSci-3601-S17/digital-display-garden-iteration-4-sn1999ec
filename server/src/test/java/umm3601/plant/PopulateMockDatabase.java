package umm3601.plant;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.types.ObjectId;
import org.junit.Before;
import umm3601.digitalDisplayGarden.PlantController;

import javax.print.Doc;
import java.io.IOException;
import java.util.*;

import static org.junit.Assert.assertEquals;

public class PopulateMockDatabase {

    public PopulateMockDatabase(){

    }

    private PlantController plantController;
    private String begoniaIdString;
    public String hexAlternantheraID;

    public void clearAndPopulateDB() throws IOException {
//        MongoClient mongoClient = new MongoClient();
//        MongoDatabase db = mongoClient.getDatabase("test");
//        MongoCollection<Document> plantDocuments = db.getCollection("plants");
//        plantDocuments.drop();
//        List<Document> testPlants = new ArrayList<>();
//        testPlants.add(Document.parse("{\n" +
//                "                    commonName: \"Angelonia\",\n" +
//                "                    cultivar: \"Angelface® Perfectly Pink,\n" +
//                "                    gardenLocation: \"1S\",\n" +
//                "                    Comments: \"20x12\", \n" +
//                "                    S=SeedV=Veg: \"V\", \n" +
//                "                    id: \"16280.0\", \n" +
//                "                    source: \"PW\", \n" +
//                "                    HB=Hang BasketC=ContainerW=Wall: \"\", \n" +
//                "                }"));
//        testPlants.add(Document.parse("{\n" +
//                "                    commonName: \"Angelonia\",\n" +
//                "                    cultivar: \"Angelface® Super Blue,\n" +
//                "                    gardenLocation: \"1S\",\n" +
//                "                    Comments: \"\", \n" +
//                "                    S=SeedV=Veg: \"V\", \n" +
//                "                    id: \"16281.0\", \n" +
//                "                    source: \"PW\", \n" +
//                "                    HB=Hang BasketC=ContainerW=Wall: \"\", \n"+
//                "                }"));
//        testPlants.add(Document.parse("{\n" +
//                "                    commonName: \"Angelonia\",\n" +
//                "                    cultivar: \"Angelface® Super Pink,\n" +
//                "                    gardenLocation: \"1S\",\n" +
//                "                    Comments: \"\", \n" +
//                "                    S=SeedV=Veg: \"V\", \n" +
//                "                    id: \"16282.0\", \n" +
//                "                    source: \"PW\", \n" +
//                "                    HB=Hang BasketC=ContainerW=Wall: \"\", \n"+
//                "                }"));
//        ObjectId begoniaId = new ObjectId("58bc8252a84aab6cbed02cea");
//        BasicDBObject begonia = new BasicDBObject("_id", begoniaId);
//        begonia = begonia.append("commonName", "Begonia")
//                .append("cultivar", "Bossa Nova Ivory")
//                .append("gardenLocation", "")
//                .append("Comments", "Container only")
//                .append("S=SeedV=Veg", "V")
//                .append("id", "16235.0")
//                .append("source", "FL")
//                .append("HB=Hang BasketC=ContainerW=Wall", "");
//        begoniaIdString = begoniaId.toHexString();
//        plantDocuments.insertMany(testPlants);
//        plantDocuments.insertOne(Document.parse(begonia.toJson()));
//
//        // It might be important to construct this _after_ the DB is set up
//        // in case there are bits in the constructor that care about the state
//        // of the database.
//        plantController = new PlantController();
    }

    public void clearAndPopulateDBAgain() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection plants = db.getCollection("plants");
        db.drop();

        //First Plant Alternanthera
        Document alternanthera = new Document();
        alternanthera.append("commonName", "Alternanthera");
        alternanthera.append("cultivar", "Experimental");
        alternanthera.append("gardenLocation", "10.0");
        alternanthera.append("Comments", "Name change from Purple Prince   14x18 spreader");
        alternanthera.append("HBHangBasketCContainerWWall", "");
        alternanthera.append("id", "16001.0");
        alternanthera.append("source", "PA");
        alternanthera.append("SSeedVVeg", "S");

        Document metadataDoc = new Document();
        metadataDoc.append("pageViews", 0);
        metadataDoc.append("ratings", new BsonArray());
        
        alternanthera.append("metadata", metadataDoc);
        //alternanthera.append("garden", "hello!");
        plants.insertOne(alternanthera );

        //Second Plant Begonia
        Document begonia = new Document();
        begonia.append("commonName", "Begonia");
        begonia.append("cultivar", "Megawatt Rose Green Leaf");
        begonia.append("gardenLocation", "10.0");
        begonia.append("Comments", "Grow in same sun or shade area; grow close proximity to each other for comparison");
        begonia.append("HBHangBasketCContainerWWall", "");
        begonia.append("id", "16008.0");
        begonia.append("source", "PA");
        begonia.append("SSeedVVeg", "S");

        Document metadataDoc1 = new Document();
        metadataDoc1.append("pageViews", 0);
        metadataDoc1.append("ratings", new BsonArray());

        begonia.append("metadata", metadataDoc1);
        plants.insertOne(begonia);

        //Third Plant Dianthus
        Document dianthus = new Document();
        dianthus.append("commonName", "Dianthus");
        dianthus.append("cultivar", "Jolt™ Pink F1");
        dianthus.append("gardenLocation", "7.0");
        dianthus.append("Comments", "");
        dianthus.append("HBHangBasketCContainerWWall", "");
        dianthus.append("id", "16040.0");
        dianthus.append("source", "AAS");
        dianthus.append("SSeedVVeg", "S");

        Document metadataDoc2 = new Document();
        metadataDoc2.append("pageViews", 0);
        metadataDoc2.append("ratings", new BsonArray());

        dianthus.append("metadata", metadataDoc2);
        plants.insertOne(dianthus);

//        //First Plant Alternanthera
//        ObjectId alternantheraId = new ObjectId();
//        BasicDBObject alternanthera = new BasicDBObject();
//        alternanthera = alternanthera.append("commonName", "Alternanthera")
//                .append("cultivar", "Experimental")
//                .append("gardenLocation", "13.0")
//                .append("Comments", "Name change from Purple Prince   14x18 spreader")
//                .append("HBHangBasketCContainerWWall", "")
//                .append("id", "16001.0")
//                .append("source", "PA")
//                .append("SSeedVVeg", "S");
//        hexAlternantheraID = alternantheraId.toHexString();
//        plantDocuments.insertOne(Document.parse(alternanthera.toJson()));


    }
}





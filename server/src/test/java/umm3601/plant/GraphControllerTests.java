package umm3601.plant;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import umm3601.digitalDisplayGarden.GraphController;
import umm3601.digitalDisplayGarden.PlantController;

import java.io.IOException;
import java.util.Iterator;

import static junit.framework.TestCase.assertEquals;

/**
 * Created by sphat001 on 4/21/17.
 */
public class GraphControllerTests {
    private final static String databaseName = "data-for-testing-only";
    private  MongoCollection<Document> graphInfoCollection;
    private GraphController graphController;

    @Before
    public void populateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        PopulateMockDatabase db = new PopulateMockDatabase();
        MongoDatabase actualDb = mongoClient.getDatabase(databaseName);
        db.clearAndPopulateDBAgain();
        graphController = new GraphController(databaseName);
        graphInfoCollection = actualDb.getCollection("graphData");
    }

    @Test
    public void successPostData() throws IOException {
        String posted = graphController.postData("first uploadId");
        assertEquals(posted, "posted");

        int count = (int) graphInfoCollection.count();
        FindIterable<Document> plants = graphInfoCollection.find();
        Iterator iterator = plants.iterator();
        String[] cultivars = new String[2];
        int counter = 0;

        while(iterator.hasNext()){
            Document current = (Document) iterator.next();

            cultivars[counter] = current.getString("cultivar");
            counter++;
        }
        String expected1 = "Experimental";
        String expected2 = "Megawatt Rose Green Leaf";

        assertEquals(count, 2);
        assertEquals(cultivars[0], expected1);
        assertEquals(cultivars[1], expected2);
    }

    @Test
    public void getDataForOneBedTest() {
        graphInfoCollection.drop();
        graphController.postData("second uploadId");
        String json = graphController.getDataForOneBed("7.0");
        String notExpected = "[[\"Cultivar\",\"Rating\",\"Visits\"],[\"Jolt™ Pink F1\",0,1]]";
        String expected = "[[\"Cultivar\",\"Likes\",\"Dislikes\",\"Views\"],[\"Jolt™ Pink F1\",0,0,0]]";

        Assert.assertNotEquals(json,notExpected);
        assertEquals(json,expected);

    }

    @Test
    public void makeJSONTest(){
        Object[][] toInsert = new Object[2][2];

        toInsert[0][0] = "wassup";
        toInsert[0][1] = "not much";
        toInsert[1][0] = "Shut the hell up";
        toInsert[1][1] = 2;

        String expected = "[[\"wassup\",\"not much\"],[\"Shut the hell up\",2]]";

        assertEquals(expected,graphController.makeJSON(toInsert));

    }


}

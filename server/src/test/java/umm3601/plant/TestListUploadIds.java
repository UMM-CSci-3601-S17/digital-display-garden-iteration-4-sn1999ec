package umm3601.plant;

import org.junit.*;
import umm3601.digitalDisplayGarden.PlantController;

import java.io.IOException;

import static junit.framework.TestCase.assertTrue;

public class TestListUploadIds {

    private final static String databaseName = "data-for-testing-only";
    private PlantController plantController;

    @Before
    public void populateDB() throws IOException {
        PopulateMockDatabase db = new PopulateMockDatabase();
        db.clearAndPopulateDBAgain();
        plantController = new PlantController(databaseName);
    }

    @Test
    public void listingOfUploadIds() throws IOException {
        assertTrue(plantController.listUploadIds() instanceof String);
    }
}

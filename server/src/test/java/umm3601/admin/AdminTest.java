package umm3601.admin;

import org.junit.Before;
import org.junit.Test;
import umm3601.digitalDisplayGarden.PlantController;
import umm3601.admin.*;
import umm3601.digitalDisplayGarden.Admin;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;

public class AdminTest {

    private final static String databaseName = "data-for-testing-only";
    private Admin admin;

    @Before
    public void makeDB() throws IOException, NoSuchAlgorithmException {
       admin = new Admin();
       admin.CreateDatabase();
    }

    @Test
    public void checkPassword() throws Exception {
       assertFalse(admin.checkPassword("NotTheCorrectPassword"));
       assertTrue(admin.checkPassword("passwordToBeHashed"));
    }

}

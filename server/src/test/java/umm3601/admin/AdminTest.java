package umm3601.admin;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.junit.Before;
import org.junit.Test;
import org.bson.Document;
import umm3601.digitalDisplayGarden.PlantController;
import umm3601.admin.*;
import umm3601.digitalDisplayGarden.Admin;

import javax.servlet.http.Cookie;
import java.io.IOException;
import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;

public class AdminTest {

    private final static String databaseName = "data-for-testing-only";
    private Admin admin;
    private MongoClient mongoClient;

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

    @Test
    public void changePassword() throws Exception {
        assertFalse(admin.changePassword("Aidansayshi"));
        assertTrue(admin.checkPassword("Aidansayshi"));
    }

    @Test
    public void testBigInt() throws Exception {
        BigInteger test = admin.getBigInt();
        assertTrue(test instanceof BigInteger);
    }

//    @Test
//    public void testCheckCookie() throws Exception {
//        Cookie test = new Cookie("authentication", admin.getBigInt().toString());
//        assertTrue(admin.checkCookie(test.getValue()));
//    }
//
//    @Test
//    public void testValidTimestamp() throws Exception {
//        MongoDatabase db = mongoClient.getDatabase(databaseName);
//        MongoCollection cookies = db.getCollection("cookies");
//        BigInteger test = admin.getBigInt();
//        assertTrue(admin.validTimeStamp(test.toString(), cookies.find(), cookies));
//    }
//    @Test
//    public void testDeleteCookie() throws Exception {
//        Cookie test = new Cookie("authentication", admin.getBigInt().toString());
//        Cookie toFail = new Cookie("hello", "lemme fail");
//        assertTrue(admin.deleteCookie(test.getValue()));
//        assertFalse(admin.deleteCookie(toFail.getValue()));
//    }
}

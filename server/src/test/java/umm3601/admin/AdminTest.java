package umm3601.admin;

import org.junit.Before;
import org.junit.Test;
import umm3601.digitalDisplayGarden.Admin;

import javax.servlet.http.Cookie;
import java.io.IOException;
import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;

import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;

public class AdminTest {

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

    @Test
    public void testCheckCookie() throws Exception {
        Cookie test = new Cookie("authentication", admin.getBigInt().toString());
        assertTrue(admin.checkCookie(test.getValue()));
    }

    @Test
    public void testDeleteCookie() throws Exception {
        Cookie test = new Cookie("authentication", admin.getBigInt().toString());
        assertTrue(admin.deleteCookie(test.getValue()));
        assertFalse(admin.deleteCookie(null));
    }
}

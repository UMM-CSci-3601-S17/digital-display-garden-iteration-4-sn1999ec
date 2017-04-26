package umm3601.digitalDisplayGarden;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import javax.xml.bind.DatatypeConverter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Iterator;
import java.util.Random;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;



public class Admin {

    private MongoCollection adminCollection;
    private static String databaseName = "test";
    public Boolean passwordIsCorrect = false;



    public void CreateDatabase() throws NoSuchAlgorithmException{
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(databaseName);
        this.adminCollection = db.getCollection("admin");
        adminCollection.drop();

        Document doc = new Document();

        doc.append("salt", "SaltSaltSaltySalt");
        doc.append("hashCode", hashFirst("passwordToBeHashed".concat("SaltSaltSaltySalt")));

        adminCollection.insertOne(doc);

    }


    public boolean checkPassword(String password) throws NoSuchAlgorithmException{
        FindIterable<Document> adminIterable;
        String checkAgainst = null;
        String hashedPasswordString = hashThing(password);

        try {
            adminIterable = adminCollection.find();

            for (Document doc : adminIterable){
                if (doc.getString("hashCode") != null){
                    checkAgainst = doc.getString("hashCode");
                }
            }
        } catch (IllegalArgumentException e) {
            checkAgainst = "null";
        }


        this.passwordIsCorrect = checkAgainst.equals(hashedPasswordString);

        return this.passwordIsCorrect;
    }


    public String hashFirst(String password) throws NoSuchAlgorithmException{

        MessageDigest md = MessageDigest.getInstance("SHA");
        byte [] hashAsBytes = DatatypeConverter.parseBase64Binary(password);
        byte [] hashedPassword = md.digest(hashAsBytes);
        String hashedPasswordString = new String(hashedPassword);

        return hashedPasswordString;

    }

    public String hashThing(String password) throws NoSuchAlgorithmException{
        FindIterable<Document> adminIterable;
        String salt;
        try {

            adminIterable = adminCollection.find();
            salt = adminIterable.first().getString("salt");
        } catch (IllegalArgumentException e) {
            salt = "null";
        }

        MessageDigest md = MessageDigest.getInstance("SHA");
        String toHash = password.concat(salt);
        byte [] hashAsBytes = DatatypeConverter.parseBase64Binary(toHash);
        byte [] hashedPassword = md.digest(hashAsBytes);
        String hashedPasswordString = new String(hashedPassword);

        return hashedPasswordString;

    }

    public Boolean changePassword(String newPassword) throws NoSuchAlgorithmException{
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(databaseName);
        this.adminCollection = db.getCollection("admin");
        String hashedPasswordString = hashThing(newPassword);

        FindIterable<Document> adminIterable;
        String salt;
        try {

            adminIterable = adminCollection.find();
            salt = adminIterable.first().getString("salt");
        } catch (IllegalArgumentException e) {
            salt = "null";
        }
//        MessageDigest md = MessageDigest.getInstance("SHA");
//        String toHash = newPassword.concat(salt);
//        byte [] hashAsBytes = DatatypeConverter.parseBase64Binary(toHash);
//        byte [] hashedPassword = md.digest(hashAsBytes);
//        String hashedPasswordString = new String(hashedPassword);

        Document doc = new Document();
        doc.append("salt", salt);
        doc.append("hashCode", hashedPasswordString);
        FindIterable<Document> findIter = adminCollection.find();
        adminCollection.drop();
        adminCollection.insertOne(doc);

        return false;
    }

    public BigInteger getBigInt(){
        Random rand = new Random();
        BigInteger bigInt = new BigInteger(1024, rand);
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(databaseName);
        MongoCollection cookies = db.getCollection("cookies");
        Document doc = new Document("number", bigInt.toString());
        doc.append("expires", 3600);
        cookies.insertOne(doc);

        return bigInt;
    }

    public boolean checkCookie(String bigInt){
        if (bigInt == null){
            return false;
        }
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(databaseName);
        MongoCollection cookies = db.getCollection("cookies");

        Document filter = new Document("number", bigInt);

        if (cookies.count(filter) > 0){
            return true;
        } else {
            return false;
        }
    }

    public boolean deleteCookie(String bigInt) {
        if (bigInt == null) {
            return false;
        }
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(databaseName);
        MongoCollection cookies = db.getCollection("cookies");
        Document filter = new Document("number", bigInt);
        cookies.findOneAndDelete(filter);
        return true;
    }
}

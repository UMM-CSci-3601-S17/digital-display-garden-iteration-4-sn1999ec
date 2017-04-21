package umm3601.digitalDisplayGarden;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Iterator;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Projections.fields;
import static com.mongodb.client.model.Projections.include;


public class Admin {

    private MongoCollection adminCollection;
    private static String databaseName = "test";
    private Boolean passwordIsCorrect = false;



    public void CreateDatabase() throws NoSuchAlgorithmException{
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(databaseName);
        this.adminCollection = db.getCollection("admin");
        adminCollection.drop();

        Document doc1 = new Document();
        doc1.append("salt", "SaltSaltSaltySalt");

        adminCollection.insertOne(doc1);

        Document doc2 = new Document();
        doc2.append("hashCode", hashThing("passwordToBeHashed"));

        adminCollection.insertOne(doc2);

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
}

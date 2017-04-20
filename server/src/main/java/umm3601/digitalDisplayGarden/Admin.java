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

    private MongoCollection<Document> adminCollection;
    private static String databaseName = "testAdmin";
    private Boolean passwordIsCorrect = false;



    public void CreateDatabase(){
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(databaseName);
        this.adminCollection = db.getCollection("admin");


        String [] check = new String [2];
        check[0] = "hashHashHash";
        check[1] = "SaltSaltSaltySalt";


        Document doc = new Document();
        doc.append("hashCode", check[0]);
        doc.append("salt", check[1]);

        adminCollection.insertOne(doc);

    }


    public boolean checkPassword(String password) throws NoSuchAlgorithmException{


        FindIterable<Document> jsonPlant;
        String salt;
        String checked;
        try {

            jsonPlant = adminCollection.find().projection(fields(include("hashCode")));

            Iterator<Document> iterator = jsonPlant.iterator();

            if (iterator.hasNext()) {
                salt = iterator.next().toJson();
            } else {
                salt = "null";
            }

        } catch (IllegalArgumentException e) {
           salt = "null";
        }
        System.out.println(salt);

        MessageDigest md = MessageDigest.getInstance("SHA");
        String toHash = password.concat(salt);
        byte [] hashAsBytes = DatatypeConverter.parseBase64Binary(toHash);
        byte [] hashedPassword = md.digest(hashAsBytes);
        String hashedPasswordString = new String(hashedPassword);

        try {

            jsonPlant = adminCollection.find().projection(fields(include("salt")));

            Iterator<Document> iterator = jsonPlant.iterator();

            if (iterator.hasNext()) {
               checked = iterator.next().toJson();
            } else {
                checked = "null";
            }

        } catch (IllegalArgumentException e) {
            checked = "null";
        }

        System.out.println(checked);

        this.passwordIsCorrect = checked.equals(hashedPasswordString);

        return this.passwordIsCorrect;
    }
}

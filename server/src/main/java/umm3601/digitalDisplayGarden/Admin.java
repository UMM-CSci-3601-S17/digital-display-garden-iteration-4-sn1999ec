package umm3601.digitalDisplayGarden;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.joda.time.DateTime;

import javax.xml.bind.DatatypeConverter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Formatter;
import java.util.Random;


public class Admin {

    private MongoCollection adminCollection;
    private static String databaseName = "test";
    public Boolean passwordIsCorrect = false;
    private MongoClient mongoClient;

    public Admin(){
        mongoClient = new MongoClient();
    }


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
        System.out.println(password);
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

        System.out.println(passwordIsCorrect);
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
        doc.append("expires", getTimePlusHour());
        cookies.insertOne(doc);

        return bigInt;
    }

    //returns what the current time will be in exactly one hour.
    private String getTimePlusHour() {
        StringBuilder sb = new StringBuilder();
        // Send all output to the Appendable object sb
        Formatter formatter = new Formatter(sb);

        java.util.Date juDate = new Date();
        DateTime dt = new DateTime(juDate);

        int day = dt.getDayOfMonth();
        int month = dt.getMonthOfYear();
        int year = dt.getYear();
        int hour = dt.getHourOfDay() + 1;
        int minute = dt.getMinuteOfHour();
        int seconds = dt.getSecondOfMinute();

        //this chunk determines whether or not the current date is valid, and fixes it if it's not.
        if (hour == 24){
            day++;
            hour = 0;
        }
        if(dayInvalid(day, month, year)){
            month++;
            day = 1;
        }
        if(monthInvalid(month)){
            year++;
            month = 1;
        }

        formatter.format("%d-%02d-%02d %02d:%02d:%02d", year, month, day, hour, minute, seconds);
        return sb.toString();
    }

    private boolean monthInvalid(int month) {
        return month > 12 || month < 1;
    }

    /*
    This ungodly expression determines whether a day is invalid, regarding whether or not the year is  leap year,
    which is where much of the complexity comes from. Th first line determines for normal months, if the day is larger
    than 31, that's invalid for all months. If the day is 31 and it's February, April, June, September, or November
    it's invalid. Then if the day is 30 and the month is february, it's invalid. And the 29th of February is invalid on
    non-leap years.
     */
    private boolean dayInvalid(int day, int month, int year) {
        return day > 31 || (day == 31 && (month == 4 || month == 6 || month == 9 || month ==11 || month == 2)) ||
                (month == 2 && (day == 30 || (day == 29 && !leapYear(year))));
    }

    /*
    Determines whether the given year is a leap year. Leap years occur on all years divisible by, and (not divisible by
    100 or divisible by 400). Ex: leapYear(2400) == true but leapYear(2100) == false.
     */
    private boolean leapYear(int year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    public boolean checkCookie(String bigInt){
        if (bigInt == null){
            return false;
        }

        MongoDatabase db = mongoClient.getDatabase(databaseName);
        MongoCollection cookies = db.getCollection("cookies");

        return validTimeStamp(bigInt, cookies.find(), cookies);

    }

    private boolean validTimeStamp(String bigInt, FindIterable<Document> allCookies, MongoCollection cookieCollection) {
        boolean authenticated = false;

        for(Document cookie : allCookies){
            if (inPast(cookie.getString("expires"))){
                cookieCollection.findOneAndDelete(cookie);
            } else if (cookie.getString("number").equals(bigInt)){
                authenticated = true;
            }
        }

        return authenticated;
    }

    private boolean inPast(String expires) {
        java.util.Date juDate = new Date();
        DateTime dt = new DateTime(juDate);

        int year = Integer.parseInt(expires.substring(0, 4));
        int month = Integer.parseInt(expires.substring(5, 7));
        int day = Integer.parseInt(expires.substring(8, 10));
        int hour = Integer.parseInt(expires.substring(11, 13));
        int minute = 60 * (hour) + Integer.parseInt(expires.substring(14, 16));
        int second = 60 * (minute) + Integer.parseInt(expires.substring(17));

        int actualYear = dt.getYear();
        int actualMonth = dt.getMonthOfYear();
        int actualDay = dt.getDayOfMonth();
        int actualSecond = dt.getSecondOfDay();

        return year < actualYear || month < actualMonth || day < actualDay || second < actualSecond;
    }

    public boolean deleteCookie(String bigInt) {
        if (bigInt == null) {
            return false;
        }


        MongoDatabase db = mongoClient.getDatabase(databaseName);
        MongoCollection cookies = db.getCollection("cookies");
        Document filter = new Document("number", bigInt);
        cookies.findOneAndDelete(filter);
        return true;
    }
}

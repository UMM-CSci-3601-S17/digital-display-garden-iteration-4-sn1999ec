package umm3601;

import com.sun.corba.se.impl.orbutil.graph.Graph;
import spark.Route;
import spark.utils.IOUtils;
import com.mongodb.util.JSON;
import umm3601.digitalDisplayGarden.GraphController;
import umm3601.digitalDisplayGarden.PlantController;
import umm3601.digitalDisplayGarden.Admin;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;

import static spark.Spark.*;

import umm3601.digitalDisplayGarden.ExcelParser;
import umm3601.digitalDisplayGarden.QRCodes;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;


public class Server {

    public static final String API_URL = "https://104.131.5.156:2538";

    public static String databaseName = "test";

    private static String excelTempDir = "/tmp/digital-display-garden";


    public static void main(String[] args) throws IOException, NoSuchAlgorithmException {

        //Note: This keystore is stolen from Spark's FAQ. We need to create our own at some point
        //and get it signed by a trusted authority.
        secure("deploy/keystore.jks", "password", null, null);

        port(2538);

//        ExcelParser parser = new ExcelParser("/AccessionList2016.xlsx");
//        parser.parseExcel("Today's Database");

        Admin admin = new Admin();
        admin.CreateDatabase();

        // This users looks in the folder `public` for the static web artifacts,
        // which includes all the HTML, CSS, and JS files generated by the Angular
        // build. This `public` directory _must_ be somewhere in the classpath;
        // a problem which is resolved in `server/build.gradle`.
        staticFiles.location("/public");

        PlantController plantController = new PlantController(databaseName);
        GraphController graphController = new GraphController(databaseName);

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
 
            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Credentials", "true");
            response.header("Access-Control-Allow-Origin", "http://localhost:9000");
            //Change 9000 to https://[droplet-ip-address]:2538 for production mode
        });

        // Redirects for the "home" page
        redirect.get("", "/");

        Route clientRoute = (req, res) -> {
            InputStream stream = plantController.getClass().getResourceAsStream("/public/index.html");
            return IOUtils.toString(stream);
        };

        //get("/", clientRoute);

        // log in admin
        post("api/logIn", (req, res) ->{
            res.type("application/json");
            if (admin.checkPassword(req.body())){
                res.cookie("authentication", admin.getBigInt().toString(), 3600);
            }
            return admin.checkPassword(req.body());
        });

        // List plants
        get("api/plants", (req, res) -> {
            res.type("application/json");
            return plantController.listPlants(req.queryMap().toMap(), plantController.getLiveUploadId());
        });

        // List flowers
        get("api/flowers", (req, res) -> {
            res.type("application/json");
            return plantController.listPlants(req.queryMap().toMap(), plantController.getLiveUploadId());
        });

        //Get a plant
        get("api/plants/:plantID", (req, res) -> {
            res.type("application/json");
            String id = req.params("plantID");
            System.out.println("ID = " + id);
            return plantController.getPlantByPlantID(id, plantController.getLiveUploadId());
        });

        //Get a flower
        get("api/flowers/:plantID", (req, res) -> {
            res.type("application/json");
            String id = req.params("plantID");
            return plantController.getPlantByPlantID(id, plantController.getLiveUploadId());
        });

        // Post Data
        get("api/postData", (req, res) -> {
            res.type("application/json");
            if (admin.checkCookie(req.cookie("authentication")) ) {
                return graphController.postData(plantController.getLiveUploadId());
            } else {
                return null;
            }
        });

        get("api/getData", (req, res) -> {
            res.type("application/json");
            if (admin.checkCookie(req.cookie("authentication"))) {
                return graphController.getLikeDataForAllPlants(plantController.getLiveUploadId());
            } else {
                return null;
            }
        });

        get("api/getBedData/:location", (req, res) -> {
            res.type("application/json");
            String location = req.params("location");
            return graphController.getDataForOneBed(plantController.getLiveUploadId(), location);
        });

        //Get feedback counts for a plant
        get("api/plants/:plantID/counts", (req, res) -> {
            res.type("application/json");
            String id = req.params("plantID");
            return plantController.getFeedbackForPlantByPlantID(id, plantController.getLiveUploadId());
        });

        //List all Beds
        get("api/gardenLocations", (req, res) -> {
            res.type("application/json");
            return plantController.getGardenLocationsAsJson(plantController.getLiveUploadId());
        });

        // List all uploadIds
        get("api/uploadIds", (req, res) -> {
            res.type("application/json");
            return plantController.listUploadIds();
        });

        post("api/plants/rate", (req, res) -> {
            res.type("application/json");
            return plantController.addFlowerRating(req.body(), plantController.getLiveUploadId());
        });

        get("api/export", (req, res) -> {
            if (admin.checkCookie(req.cookie("authentication"))) {
                res.type("application/vnd.ms-excel");
                res.header("Content-Disposition", "attachment; filename=\"plant-comments.xlsx\"");
                // Note that after flush() or close() is called on
                // res.raw().getOutputStream(), the response can no longer be
                // modified. Since writeComments(..) closes the OutputStream
                // when it is done, it needs to be the last line of this function.
                plantController.writeComments(res.raw().getOutputStream(), req.queryMap().toMap().get("uploadId")[0]);
                return res;
            } else {
                return null;
            }
        });

        get("api/exportFeedback", (req, res) -> {
            if (admin.checkCookie(req.cookie("authentication"))) {
                res.type("application/vnd.ms-excel");
                res.header("Content-Disposition", "attachment; filename=\"plant-feedback.xlsx\"");
                // Note that after flush() or close() is called on
                // res.raw().getOutputStream(), the response can no longer be
                // modified. Since writeComments(..) closes the OutputStream
                // when it is done, it needs to be the last line of this function.
                plantController.writeFeedback(res.raw().getOutputStream(), req.queryMap().toMap().get("uploadId")[0]);
                return res;
            } else {
                return null;
            }
        });

        get("api/liveUploadId", (req, res) -> {
            res.type("application/json");
            return JSON.serialize(plantController.getLiveUploadId());
        });



        get("api/qrcodes", (req, res) -> {
            if (admin.checkCookie(req.cookie("authentication"))) {
                res.type("application/zip");

                String liveUploadID = plantController.getLiveUploadId();
                System.err.println("liveUploadID=" + liveUploadID);
                String zipPath = QRCodes.CreateQRCodesFromAllBeds(
                        liveUploadID,
                        plantController.getGardenLocations(liveUploadID),
                        API_URL + "/");
                System.err.println(zipPath);
                if (zipPath == null)
                    return null;

                res.header("Content-Disposition", "attachment; filename=\"" + zipPath + "\"");

                //Get bytes from the file
                File zipFile = new File(zipPath);
                byte[] bytes = spark.utils.IOUtils.toByteArray(new FileInputStream(zipFile));

                //Delete local .zip file
                Files.delete(Paths.get(zipPath));

                return bytes;
            } else {
                return null;
            }
        });

        // Posting a comment
        post("api/plants/leaveComment", (req, res) -> {
            res.type("application/json");
            return plantController.storePlantComment(req.body(), plantController.getLiveUploadId());
        });

        // Accept an xls file
        post("api/import", (req, res) -> {
            if (admin.checkCookie(req.cookie("authentication"))) {

                res.type("application/json");
                try {

                    MultipartConfigElement multipartConfigElement = new MultipartConfigElement(excelTempDir);
                    req.raw().setAttribute("org.eclipse.jetty.multipartConfig", multipartConfigElement);

                    String fileName = Long.valueOf(System.currentTimeMillis()).toString();
                    Part part = req.raw().getPart("file[]");

                    ExcelParser parser = new ExcelParser(part.getInputStream(), databaseName);

                    String id = ExcelParser.getAvailableUploadId();
                    parser.parseExcel(id);

                    return JSON.serialize(id);

                } catch (Exception e) {
                    e.printStackTrace();
                    throw e;
                }
            } else {
                return null;
            }

        });

        //check the cookie
        get("api/checkCookie", (req, res) -> {
            System.out.println("I got here 1");
            return admin.checkCookie(req.cookie("authentication"));
        });

        // Accept an xls file
        post("api/updateData", (req, res) -> {
            if (admin.checkCookie(req.cookie("authentication"))) {

                res.type("application/json");
                try {

                    MultipartConfigElement multipartConfigElement = new MultipartConfigElement(excelTempDir);
                    req.raw().setAttribute("org.eclipse.jetty.multipartConfig", multipartConfigElement);

                    String fileName = Long.valueOf(System.currentTimeMillis()).toString();
                    Part part = req.raw().getPart("file[]");

                    ExcelParser parser = new ExcelParser(part.getInputStream(), databaseName);

                    String id = ExcelParser.getAvailableUploadId();
                    String currentId = plantController.getLiveUploadId();
                    parser.parseUpdatedSpreadsheet(id, currentId);

                    return JSON.serialize(id);

                } catch (Exception e) {
                    e.printStackTrace();
                    throw e;
                }
            } else {
                return null;
            }

        });
//        get("api/bed/*")

        get("/*", clientRoute);

        // Handle "404" file not found requests:
        notFound((req, res) -> {
            res.type("text");
            res.status(404);
            return "Sorry, we couldn't find that!";
        });
    }
}

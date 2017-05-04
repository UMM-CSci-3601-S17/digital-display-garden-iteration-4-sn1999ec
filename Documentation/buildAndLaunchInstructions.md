#How to build and launch this project on a server

##Step 1: Configuring the server
1: Open a terminal as root on the server

2: `wget https://gist.githubusercontent.com/joethe/c3062afd3e58fe21c5fabdb36ae883bb/raw/633a49154861ab678f2173662a5caf5e8881f145/3601-setup.sh`

3: `chmod +x 3601-setup.sh`

4: `./3601-setup.sh`

##Step 2: Get an SSL certificate
Using [Let's Encrypt](https://letsencrypt.org/) and [certbot](https://certbot.eff.org/)is recommended if there isn't 
already a protocol for this. You need the certificate in .jks format, a guide on how to do that can be found [here](https://community.thingworx.com/thread/39949)

##Step 3: Get a Google Charts API key
Go [here](https://developers.google.com/maps/documentation/javascript/get-api-key), click 'GET A KEY', and follow all
directions there. Write down this key somewhere.

##Step 4: Cloning and configuring the code base:
1: `git clone https://github.com/UMM-CSci-3601-S17/digital-display-garden-iteration-4-sn1999ec.git`

2: `cd digital-display-garden-iteration-4-sn1999ec`

3: Use the text editor of your choice to change line 38 in `server/src/main/java/Server.java` to reflect where the .jks
file for your SSL certificate is, and what your password is. So it might read 
`secure("/keystore.jks", "password", null, null);` 

4: On line 74 change `http://localhost:9000` to your URL (this must start with https:// unlike the current text)

5: In `client/webpack.prod.js` change line 74 from `https://104.131.5.156:2538/api/` to `https://[yourURL]/api`

6: Change line 9 in `clienct/src/index.html` to what your key is from the string 'key=' to the following '&' sign

##Step 5: Build and launch the project

1: run `./buildAndLaunchProject.sh`
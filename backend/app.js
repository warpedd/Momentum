const fs = require("fs");
const admin = require("firebase-admin");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const apiv1 = require("./apiv1/apiv1");

require('dotenv').config();

// adding firebase credentials to the backend
const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const mongoURL = process.env.MONGO_CONNECTION_STRING; 

// Connect to MongoDB using Mongoose
const start = async () => {
    try {
      await mongoose.connect(mongoURL);
      app.listen(5000, () => console.log("Connected to port 5000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};

start();

// Use CORS middleware
app.use(cors());

// Use express.json middleware
app.use(express.json());

// Middleware to process user
// if a user is logged in, authToken included, 
// if not, just load basic info without perms that come with being logged in
app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (error) {
            res.status(400).json({ error: "Request for authtoken caused error." });
        }
    }

    // in case someone is not logged in but they still make the request
    req.user = req.user || {};
    next();
});

// Mount the routes on the '/apiv1' path
app.use("/apiv1/", apiv1);



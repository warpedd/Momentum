const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const apiv1 = require("./apiv1/apiv1");

const { fileURLToPath } = require('url');
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// allow hosting platform to choose port number, but it stays 5000 for development
const PORT = process.env.PORT || 5000;

require('dotenv').config();

// adding firebase credentials to the backend
const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const mongoURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@m-cluster-0.7kpsbmw.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
const start = async () => {
    try {
        await mongoose.connect(mongoURL);
        app.listen(PORT, () => console.log(`Connected to port ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

// Use CORS middleware
app.use(cors());

// Use express.json middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, './build'), { etag: false, lastModified: false }));

app.get(/^(?!\/apiv1).+/, nocache, (req, res) => {
    //res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.sendFile(path.join(__dirname, './build/index.html'));
});

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




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const apiv1 = require("./apiv1/apiv1");

//const userRoutes = require("./routes/userRoutes.js");

require('dotenv').config();

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

// Mount the routes on the '/apiv1' path
app.use("/apiv1/", apiv1);



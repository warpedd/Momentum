
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes.js");

require('dotenv').config();

const mongoURL = process.env.MONGO_CONNECTION_STRING; 

// Connect to MongoDB using Mongoose
const start = async () => {
    try {
      await mongoose.connect(mongoURL);
      app.listen(3000, () => console.log("Connecting to Atlas..."));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};

start();

app.use(express.json());
app.use(cors());

// Mount the routes on the '/api' path
app.use("../api", userRoutes);



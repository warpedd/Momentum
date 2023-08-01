let UserModel = require("../models/userModel.js");

// Controller function for creating a new user
const createUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // Create a new user instance
    const newUser = new UserModel({
      name: name,
      email: email,
      password: password, 
      creationDate: new Date()
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with the newly created user
    res.status(201).json(savedUser);
  } catch (error) {
        // Handle specific errors that may occur during user creation
        if (error.name === "ValidationError") {
        // If the error is a validation error (e.g., missing required fields)
        res.status(400).json({ error: "Validation error. Check user data." });
        } else if (error.name === "MongoError" && error.code === 11000) {
        // If the error is a duplicate key error (e.g., duplicate email)
        res.status(409).json({ error: "Email already exists. Choose a different email." });
        } else {
        // For any other unexpected error
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user. Please try again later." });
        }
    }
};

module.exports = {
  createUser,
};
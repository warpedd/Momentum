let UserModel = require("../models/userModel.js");

// Controller function for creating a new user
const createUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, username, password } = req.body;

    // Create a new user instance
    const newUser = new UserModel({
      name: name,
      username: username,
      password: password, 
      creationDate: new Date()
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with the newly created user
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle any errors that occurred during user creation
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  createUser,
};
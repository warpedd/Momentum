let express = require('express');
let router = express.Router();
let UserController = require('../controllers/userController.js');

/*
 * POST
 */
/*
 * Creates a new user  by taking in a JSON object
 */
router.post('/', UserController.createUser);

module.exports = router; 
let express = require('express');
let router = express.Router();
let UserController = require('../controllers/userController.js');

router.get('/', UserController.createUser);

module.exports = router; 
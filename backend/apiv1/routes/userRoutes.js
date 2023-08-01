let express = require('express');
let router = express.Router();
let UserController = require('../controllers/userController.js');

router.post('/', UserController.createUser);

module.exports = router; 
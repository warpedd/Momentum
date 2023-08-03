let express = require('express');
let router = express.Router();
let TaskController = require('../controllers/taskController.js');

router.get('/', TaskController.listTasks);
/*
 * POST
 */
/*
 * Creates a new task by taking in a JSON object
 */
router.post('/', TaskController.createTask);

module.exports = router; 
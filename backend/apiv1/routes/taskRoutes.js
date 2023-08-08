let express = require('express');
let router = express.Router();
let TaskController = require('../controllers/taskController.js');

/*
 * Get
 */
/*
 * Creates a new task by taking in a JSON object
 */
router.get('/', TaskController.listTasks);

/*
 * POST
 */
/*
 * Creates a new task by taking in a JSON object
 */
router.post('/', TaskController.createTask);

router.delete('/:id', TaskController.deleteTask);

module.exports = router; 
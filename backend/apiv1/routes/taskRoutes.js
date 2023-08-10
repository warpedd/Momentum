let express = require('express');
let router = express.Router();
let TaskController = require('../controllers/taskController.js');

/*
 * Get - list all tasks
 */
router.get('/', TaskController.listTasks);

/*
 * POST - creates a new task by taking in a JSON object
 */
router.post('/', TaskController.createTask);

/*
 * PUT - update a task given its id
 */
router.put('/:id', TaskController.updateTask);

/*
 * Delete - delete a task given its id
 */
router.delete('/:id', TaskController.deleteTask);

module.exports = router; 
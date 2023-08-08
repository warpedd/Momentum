let taskModel = require("../models/taskModel.js");

const listTasks = async (req, res) => {
    try {
        // Use the find method without filter for all tasks
        const { uid } = req.user;

        const tasks = await taskModel.find({ userId: uid });

        // Respond with the array of tasks
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error finding tasks:", error);
        res.status(500).json({ error: "Failed to retrieve tasks. Please try again later." });
    }
}

// Controller function for creating a new task
const createTask = async (req, res) => {
    try {
        // Extract task data from the request body
        const { taskName, priority, estimatedPomodoros, notes } = req.body;
        const { uid } = req.user;

        // Create a new task instance
        const newTask = new taskModel({
            userId: uid,
            taskName: taskName,
            priority: priority,
            estimatedPomodoros: estimatedPomodoros,
            notes: notes,
        });

        // Save the new task to the database
        const savedTask = await newTask.save();

        // Respond with the newly created task
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task. Please try again later." });
    }
};

// Controller function for deleting a task
const deleteTask = async (req, res) => {
    let id = req.params.id;

    try {
        const deletedTask = await taskModel.findByIdAndRemove(id);
        if (deletedTask) {
            res.status(200).json({ message: "Task deleted successfully." });
        } else {
            res.status(404).json({ error: "Task not found." });
        }
    } catch (err) {
        return res.status(500).json({ error: "Error deleting task." });
    }
}

// const incrementPomodoros = async (req, res) => {
//     try {
//         const { name } = req.params; 
//     }
// }; 

module.exports = {
    listTasks,
    createTask,
    deleteTask
};
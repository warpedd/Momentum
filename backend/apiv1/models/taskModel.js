const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const TaskSchema = new Schema({
    taskName: {
        type: String, 
        required: true,
        index: { unique: true }
    }, 
    priority: {
        type: Number, 
        required: true,  
    }, 
    estimatedPomodoros: {
        type: Number, 
        required: true
    }, 
    actualPomodoros: {
        type: Number, 
        required: true,
        default: 0,
    }, 
    notes: {
        type: String, 
        required: false
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Task", TaskSchema);
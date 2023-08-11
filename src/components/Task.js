//
// Component for producing tasks. A task is a unit of work.

import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import useUser from '../hooks/useUser'


// markComplete - callback for handling task complete action
// markChange - callback for handline task delete action

const Task = ({ task, markChange }) => {
    const { user } = useUser();
    const deleteTask = async (taskId) => {
        try {
            const token = await user?.getIdToken();
            const headers = token ? { authtoken: token } : {};

            await axios.delete(`http://localhost:5000/apiv1/tasks/${taskId}`, { headers });

            // Callback to trigger reload of task list.
            markChange();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const completeTask = async (taskId, action) => {
        try {
            const token = await user?.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const body = { action };

            await axios.put(`http://localhost:5000/apiv1/tasks/${taskId}`, body, { headers });

            // Update your task list or UI as needed
            markChange();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="task">
            <div>
                <h3>{task.taskName}{' '}</h3>
                <div className="btn-container">
                    {!task.isCompleted ? <button className='complete-btn' onClick={() => completeTask(task._id, 'toggleCompletion')}> <FaCheck size={20} /></button> : false}

                    <span>     </span>
                    <button className='delete-btn' onClick={() => deleteTask(task._id)}><IoMdClose size={20} /></button>
                </div>
            </div>
            <p>Priority: {task.priority}</p>
            <p>Est. Pomodoros: {task.estimatedPomodoros}</p>
            {!task.notes ? <p></p> : <p>Notes:{task.notes}</p>}
        </div>
    )
}

export default Task
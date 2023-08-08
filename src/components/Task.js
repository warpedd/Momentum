//
// Component for producing tasks. A task is a unit of work.

import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import useUser from '../hooks/useUser'


// markComplete - callback for handling task complete action
// markDelete - callback for handline task delete action

const Task = ({ task, markComplete, markDelete }) => {
    const { user } = useUser();
    const deleteTask = async (taskId) => {
        console.log(taskId);
        try {
            const token = await user?.getIdToken();
            const headers = token ? { authtoken: token } : {};

            await axios.delete(`http://localhost:5000/apiv1/tasks/${taskId}`, { headers });

            // Callback to trigger reload of task list.
            markDelete();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="task">
            <div>
                <h3>{task.taskName}{' '}</h3>
                <div className="btn-container">
                    <button className='complete-btn' onClick={markComplete}><FaCheck size={20} /></button>
                    <span>     </span>
                    <button className='delete-btn' onClick={() => deleteTask(task._id)}><IoMdClose size={20} /></button>
                </div>
            </div>
            <p>Priority: {task.priority}</p>
            <p>Est. Pomodoros: {task.estPoms}</p>
            {!task.notes ? <p></p> : <p>Notes:{task.notes}</p>}
        </div>
    )
}

export default Task
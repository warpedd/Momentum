import React, { useState, useRef } from 'react'
import axios from 'axios';
import useUser from '../hooks/useUser'

const CreateTask = ({ onTaskListUpdated }) => {
    const [taskName, setTaskName] = useState('')
    const [priority, setPriority] = useState(10)
    const [estPoms, setEstPoms] = useState(1)
    const [notes, setNotes] = useState('')
    const { user } = useUser();

    const [errMsg, setErrMsg] = useState('')

    // Set the form back to the defaults
    function clearForm() {
        setTaskName('')
        setPriority(10)
        setEstPoms(1)
        setNotes('')
    }

    // Post to DB with form data, trigger update of task list via callback, clear form.
    const addTask = async (e) => {
        e.preventDefault()

        try {
            //
            // TODO: Add check for task name already in task list
            //
            if (!taskName) {
                setErrMsg('Please provide a task name');
                return;
            } else {
                const token = user && await user.getIdToken();
                const headers = token ? { authtoken: token } : {};
                axios.post("http://localhost:5000/apiv1/tasks/", {
                    userId: token,
                    taskName: taskName,
                    priority: priority,
                    estimatedPomodoros: estPoms,
                    notes: notes
                }, { headers });

                // Clear form and trigger task list reload
                clearForm();
                onTaskListUpdated();
            }
        } catch (error) {
            // Handle the error here
            console.error('Error adding task:', error);

        }
    }

    return (
        <form id='add-task-form' className='add-task' onSubmit={addTask}>
            <div className='form-input'>
                <label>Name</label>
                <input
                    type='text'
                    placeholder='Task Name'
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div className='form-input'>
                <label>Priority</label>
                <input
                    type='number'
                    value={priority}
                    max={10}
                    min={1}
                    onChange={(e) => setPriority(e.target.value)}
                />
            </div>
            <div className='form-input'>
                <label>Est. Pomodoros</label>
                <input
                    type='number'
                    max={4}
                    min={1}
                    value={estPoms}
                    onChange={(e) => setEstPoms(e.currentTarget.value)}
                />
            </div>
            <div className='form-input'>
                <label>Notes</label>
                <textarea
                    name="taskNotes"
                    rows={4} cols={40}
                    onChange={(e) => setNotes(e.currentTarget.value)}
                />
            </div>

            <div className='form-msg'>
                <p id='task-input-msg'>{errMsg}</p>
            </div>

            <input type='submit' value='Save Task' className='button-generic button-add-task-submit' />
        </form>
    )
}

export default CreateTask
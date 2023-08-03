import { useState } from 'react'
import axios from 'axios';

const CreateTask = ({ onTaskListUpdated }) => {
    const [taskName, setTaskName] = useState('')
    const [priority, setPriority] = useState(99)
    const [estPoms, setEstPoms] = useState(1)
    const [notes, setNotes] = useState('')
    
    const addTask = async (e) => {
        e.preventDefault()

        try {
            if (!taskName) {
                alert('Please provide a task name');
                return;
            } else {
                axios.post(`http://localhost:5000/apiv1/tasks/`, {
                    taskName: taskName, 
                    priority: priority, 
                    estimatedPomodoros: estPoms, 
                    notes: notes
                });
                onTaskListUpdated();

                // Clear forms following submit
                setTaskName('');
                setPriority(99);
                setEstPoms(1);
                setNotes('');
            }
        } catch (error) {
            // Handle the error here
            console.error('Error adding task:', error);
        }
    }
  
    return (
      <form className='add-task' onSubmit={addTask}>
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
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div className='form-input'>
          <label>Est. Pomodoros</label>
          <input
            type='number'
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
        
  
        <input type='submit' value='Save Task' className='button-generic button-generic-block' />
      </form>
    )
  }
  
  export default CreateTask
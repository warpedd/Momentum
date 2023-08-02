import { useState } from 'react'

const CreateTask = ({ onAdd }) => {
    const [textName, setTextName] = useState('')
    const [priority, setPriority] = useState(99)
    const [estPoms, setEstPoms] = useState(1)
    const [notes, setNotes] = useState('')
    
    const onSubmit = (e) => {
      e.preventDefault()
  
      if (!textName) {
        alert('Please provide a task name')
        return
      }
  
      onAdd({ textName, priority, estPoms, notes })
  
      // Clear forms following submit
      setTextName('')
      setPriority(99)
      setEstPoms(0)
      setNotes('')
    }
  
    return (
      <form className='add-task' onSubmit={onSubmit}>
        <div className='form-input'>
          <label>Name</label>
          <input
            type='text'
            placeholder='Task Name'
            value={textName}
            onChange={(e) => setTextName(e.target.value)}
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
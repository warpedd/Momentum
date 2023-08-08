//
// Component for producing tasks. A task is a unit of work.

import {FaCheck} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'

// markComplete - callback for handling task complete action
// markDelete - callback for handline task delete action
const Task = ({task, markComplete, markDelete}) => {
  return (
    <div className="task">
      <div>
        <h3>{task.taskName}{' '}</h3>
        <div className="btn-container">
          <button className='complete-btn' onClick={markComplete}><FaCheck size={20}/></button>
          <span>     </span>
          <button className='delete-btn' onClick={markDelete}><IoMdClose size={20}/></button>
        </div>
      </div>
      <p>Priority: {task.priority}</p>
      <p>Est. Pomodoros: {task.estPoms}</p>
      {!task.notes ? <p></p> : <p>Notes:{task.notes}</p>}
    </div>
  )
}

export default Task
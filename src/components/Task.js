//
// Component for producing tasks. A task is a unit of work.


const Task = ({task}) => {
  return (
    <div
      className="task"    >
      <h3>
        {task.textName}{' '}
      </h3>
      <p>Priority: {task.priority}</p>
      <p>Est. Pomodoros: {task.estPoms}</p>
      {!task.notes ? <p></p> : <p>Notes:{task.notes}</p>}
    </div>
  )
}

export default Task
import Task from './Task'

const TaskList = ({tasks}) => {

    return(
        <div className='tasks'>
            {
            // sort tasks and then provide to map for creating tasks on page
            tasks.sort((a,b) => a.priority > b.priority).map((task, index) => (
                <Task task={task} />
            ))}
        </div>
    )
}

export default TaskList
import Task from './Task'

const TaskList = ({ tasks, markChange }) => {

    return (
        <div className='tasks'>
            {
                tasks.sort((a, b) => a.priority > b.priority).map((task, index) => (
                    <Task
                        key={task._id} // Make sure to include a unique key for each Task component
                        task={task}
                        markChange={markChange} // Pass the deleteTask callback to the Task component
                    />
                ))}
        </div>
    )
}

export default TaskList;
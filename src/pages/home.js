import React, { useState } from 'react';
import Pomodoro from '../components/Pomodoro';
import CreateTask from '../components/CreateTask';
import TaskList from "../components/TaskList";
import Button from '../components/Button';
import useUser from '../hooks/useUser'

// returns the homepage for momentum
function Home({pomodoroDur, shortBreakDur, longBreakDur}) {

    // Top level state and functions for tasks
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]);
    const { user, isLoading } = useUser();

    const createTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1;
        const newTask = { id, ...task };
        setTasks([...tasks, newTask]);
    }

    return (
        <>
            <Pomodoro pomodoroDur={pomodoroDur} shortBreakDur={shortBreakDur} longBreakDur={longBreakDur}/>
            <div className='task-container'>
                <header className='task-list-header'>
                    <h3>Tasks</h3>
                    {user 
                        ? <Button
                            color={'green'}
                            text={'Add'}
                            onClick={() => setShowAddTask(!showAddTask)}
                            />
                        : <Button
                            color={'grey'}
                            text={'Login to add tasks'}
                            />} 
                </header>
                {showAddTask && <CreateTask onAdd={createTask} />}
                <TaskList tasks={tasks} />                        
            </div>
        </>
    );
}

export default Home;
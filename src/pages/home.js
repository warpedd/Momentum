import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import Pomodoro from '../components/Pomodoro';
import CreateTask from '../components/CreateTask';
import TaskList from "../components/TaskList";
import Button from '../components/Button';
import useUser from '../hooks/useUser'
import { IoMdSettings } from "react-icons/io";

// returns the homepage for momentum
function Home({onSettingsClick, pomodoroDur, shortBreakDur, longBreakDur}) {

    // Top level state and functions for tasks
    const [showAddTask, setShowAddTask] = useState(false)
    const [ tasks, setTasks] = useState([]);
    const { user, isLoading } = useUser();

    const loadTaskInfo = async () => {
        const response = await axios.get("http://localhost:5000/apiv1/tasks/");
        const newTaskList = response.data;
        setTasks(newTaskList);
    }

    useEffect(() => {
        loadTaskInfo();
    }, []);

    return (
        <>
            <button className="setting-btn-generic" onClick={onSettingsClick}><div className="setting-btn-icon"><IoMdSettings/></div> Settings</button>
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
                {showAddTask && <CreateTask/>}
                <TaskList tasks={tasks} />                        
            </div>
        </>
    );
}

export default Home;
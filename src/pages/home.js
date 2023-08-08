import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import Pomodoro from '../components/Pomodoro';
import CreateTask from '../components/CreateTask';
import TaskList from "../components/TaskList";
import Button from '../components/Button';
import useUser from '../hooks/useUser'

// returns the homepage for momentum
function Home({ pomodoroDur, shortBreakDur, longBreakDur }) {

    // Top level state and functions for tasks
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [tasksChanged, setTasksChanged] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const loadTaskInfo = async () => {
            const token = await user?.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get("http://localhost:5000/apiv1/tasks/", { headers });
            const newTaskList = response.data;
            setTasks(newTaskList);
        }

        if (user || tasksChanged) {
            loadTaskInfo();
            setTasksChanged(false);
        }
    }, [user, tasksChanged]);


    // Callback for triggering update of the task list.
    function updateTasksChanged() {
        setTasksChanged(true);
    }

    return (
        <>
            <Pomodoro pomodoroDur={pomodoroDur} shortBreakDur={shortBreakDur} longBreakDur={longBreakDur} />
            <div className='task-background'>
                <div className='task-container'>
                    <header className='task-list-header'>
                        <h3>Tasks</h3>
                        {user
                            ? <Button
                                color={'#307D4F'}
                                text={'Add'}
                                onClick={() => setShowAddTask(!showAddTask)}
                            />
                            : <Button
                                color={'grey'}
                                text={'Login to add tasks'}
                            />}
                    </header>
                    {showAddTask && <CreateTask onTaskListUpdated={updateTasksChanged} />}
                    <TaskList tasks={tasks} markDelete={updateTasksChanged} />
                </div>
            </div>
        </>
    );
}

export default Home;
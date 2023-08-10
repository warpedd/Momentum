import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import Pomodoro from '../components/Pomodoro';
import CreateTask from '../components/CreateTask';
import TaskList from "../components/TaskList";
import Button from '../components/Button';
import useUser from '../hooks/useUser'

// returns the homepage for momentum
function Home({ pomodoroDur, shortBreakDur, longBreakDur,
    autoStartBreak, autoStartPomodoro,
    pomodorosBeforeLongBreak, onSwitchShortBreak, onSwitchLongBreak }) {

    // Top level state and functions for tasks
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [tasksChanged, setTasksChanged] = useState(false);
    const [incTasks, setIncTasks] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const loadTaskInfo = async () => {
            const token = await user?.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get("http://localhost:5000/apiv1/tasks/", { headers });
            const newTaskList = response.data;
            setTasks(newTaskList);
        }


        // Generate the task lists we feed into lower level components and then reset our trigger callback
        if (user || tasksChanged) {
            loadTaskInfo();
            setTasksChanged(false);
        }
    }, [user, tasksChanged]);

    // Trigger generation of any filtered task lists on change to tasks
    useEffect(() => {
        incompleteTaskList();
    }, [tasks]);

    function incompleteTaskList() {

        let incompleteTasks = tasks.filter((elem) => !elem.isCompleted)
        //console.log("Home page incompleteTasks: ", incompleteTasks)
        setIncTasks(incompleteTasks);
    }

    // Callback for triggering update of the task list.
    // Failing to include this will lead to tasks either failing to render on change
    // or entirely.
    function updateTasksChanged() {
        setTasksChanged(true);
    }

    // Input to task list component - filter out here because lower level component is generic.


    return (
        <>
            <Pomodoro
                pomodoroDur={pomodoroDur}
                shortBreakDur={shortBreakDur}
                longBreakDur={longBreakDur}
                autoStartBreak={autoStartBreak}
                autoStartPomodoro={autoStartPomodoro}
                pomodorosBeforeLongBreak={pomodorosBeforeLongBreak}
                switchShortBreak={onSwitchShortBreak}
                switchLongBreak={onSwitchLongBreak} />
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
                    <TaskList tasks={incTasks} markChange={updateTasksChanged} />
                </div>
            </div>
        </>
    );
}

export default Home;
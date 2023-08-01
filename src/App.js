// Component Imports
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Pomodoro from './components/Pomodoro';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tracker from "./pages/Tracker";
import Music from "./pages/Music";
import Setting from "./pages/Setting";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import CreateTask from './components/CreateTask';
import TaskList from "./components/TaskList";
import Button from './components/Button';

// Style imports
import './styles/ButtonGeneric.css'
import './styles/Tasks.css'

const App = () => {
    // Top level state and functions for tasks
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]);
    
    const createTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }
    
    // Top level state and functions for settings
    const [showSettings, setShowSettings] = useState(false);
  
    const handleSettingsClick = () => {
      setShowSettings(true);
    };
  
    const handleCloseSettings = () => {
      setShowSettings(false);
    };  

    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
      setCurrentForm(formName);
    }

    // Render method for App component
    return (
        <React.Fragment>
            <Router>
                <Navbar onSettingsClick={handleSettingsClick} />
                <Switch>
                    <Route path="/" exact>
                        <Pomodoro />
                            <div className='task-container'>
                                <header className='task-list-header'>
                                    <h3>Tasks</h3>
                                    <Button
                                        color={'green'}
                                        text={'Add'}
                                        onClick={() => setShowAddTask(!showAddTask)}
                                    />
                                    
                                </header>
                                {showAddTask && <CreateTask onAdd={createTask} />}
                                <TaskList tasks={tasks} />                        
                        </div>
                    </Route>
                    <Route path="/tracker" Component={Tracker} exact>
                        <Tracker/>
                    </Route>
                    <Route path="/music" Component={Music} exact>
                        <Music/>
                    </Route>
                    <Route path="/login" Component={Login} exact>
                        {
                            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
                        }
                    </Route>
                    <Route path="/settings">
                        <Setting closeSettings={handleCloseSettings} />
                    </Route>
                </Switch>
            </Router>
             {showSettings && <Setting closeSettings={handleCloseSettings} />}
         </React.Fragment>
    );
  };
  
  export default App;
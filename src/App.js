// Component Imports
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Tracker from "./pages/Tracker";
import Music from "./pages/Music";
import Setting from "./pages/Setting";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import useUser from './hooks/useUser';

// Style imports
import './styles/ButtonGeneric.css'
import './styles/Tasks.css'
import './App.css'
// import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const App = () => {
    // Top level state and functions for settings

    // State for settings - inputs to both settings page and pomodoro
    const [pomodoroDur, setPomodoroDur] = useState(25);
    const [shortBreakDur, setShortBreakDur] = useState(5);
    const [longBreakDur, setLongBreakDur] = useState(15);
    const [autoStartBreak, setAutoStartBreak] = useState(false);
    const [autoSwitchTask, setAutoSwitchTasks] = useState(false);
    const [autoStartPomodoro, setAutoStartPomodoro] = useState(false);

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

    const { user } = useUser();

    // Render method for App component
    return (
        <React.Fragment>
            <Router>
                <Navbar onSettingsClick={handleSettingsClick}/>
                <Switch>
                    <Route path="/" Component={Home} exact>
                        <Home 
                            onSettingsClick={handleSettingsClick}
                            pomodoroDur={pomodoroDur} 
                            shortBreakDur={shortBreakDur} 
                            longBreakDur={longBreakDur}/>
                    </Route>
                    <Route path="/tracker" Component={Tracker} exact>
                        { user ? <Tracker/> : 
                            <div><p className="not-login-tracker-text">Please login to see Tracker data</p> 
                                { currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> }
                            </div> }
                    </Route>
                    <Route path="/music" Component={Music} exact>
                        <Music/>
                    </Route>
                    <Route path="/login" Component={Login} exact>
                        { currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> }
                    </Route>
                </Switch>
            </Router>
             {showSettings && <Setting 
                                closeSettings={handleCloseSettings} 
                                pomodoroDur={pomodoroDur} 
                                setPomodoroDur={setPomodoroDur}
                                shortBreakDur={shortBreakDur} 
                                setShortBreakDur={setShortBreakDur}
                                longBreakDur={longBreakDur} 
                                setLongBreakDur={setLongBreakDur}
                                autoStartBreak={autoStartBreak} 
                                setAutoStartBreaks={setAutoStartBreak}
                                autoSwitchTask={autoSwitchTask} 
                                setAutoSwitchTasks={setAutoSwitchTasks}
                                autoStartPomodoro={autoStartPomodoro} 
                                setAutoStartPomodoro={setAutoStartPomodoro}/>}
         </React.Fragment>
    );
  };
  
  export default App;
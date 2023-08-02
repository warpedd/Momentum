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

// Style imports
import './styles/ButtonGeneric.css'
import './styles/Tasks.css'

const App = () => {
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
                    <Route path="/" compnent={Home} exact>
                        <Home/>
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
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Pomodoro from './components/Pomodoro';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tracker from "./pages/Tracker";
import Music from "./pages/Music";
import Setting from "./pages/Setting";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";


const App = () => {
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

    return (
        <React.Fragment>
            <Router>
                <Navbar onSettingsClick={handleSettingsClick} />
                <Switch>
                    <Route path="/" exact>
                        <Pomodoro />
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
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

import React from 'react';
import Navbar from "./components/Navbar";
import Pomodoro from './components/Pomodoro';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tracker from "./pages/Tracker";
import Music from "./pages/Music";
import {Login} from "./pages/Login";
import Setting from "./pages/Setting";


const App = () => {
    return (
        <React.Fragment>
            <Router>
                <Navbar/>
                {/* <Pomodoro /> */}
                <Switch>
                    <Route path="/" exact>
                        <Pomodoro />
                    </Route>
                    <Route path="/tracker" Component={Tracker} exact>
                        <Tracker/>
                    </Route>
                    <Route path="/login" Component={Login} exact>
                        <Login/>
                    </Route>
                    <Route path="/setting" Component={Setting} exact>
                        <Setting/>
                    </Route>
                    
        
    

                </Switch>
            </Router>
        </React.Fragment>
    );
  }
  
  export default App;
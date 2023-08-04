import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import "../styles/Login.css";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    // We use 'history' to navigate to the home page after a successful login
    const history = useHistory();

    // Handles user authentication using firebase, this is called when the form is submitted
    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(getAuth(), email, pass);
            history.push("/");
        } catch (error) {
            // If user is not authenticated, this sets the error using what is caught from firebase
            setError(error.message);
        }
    }
  
    return (
        <div className="login-box">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form className="login-form" onSubmit={handleLogIn}>
                <label htmlFor="email">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="Enter email" 
                    id="email" 
                    name="email" />
                <label htmlFor="password">Password</label>
                <input 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)} 
                    type="password" 
                    placeholder="Enter password" 
                    id="password" 
                    name="password" />
                <button className="login-button-generic" type="submit">Log In</button>
            </form>
            <button className="login-link-button-generic" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
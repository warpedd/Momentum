import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import "../styles/Register.css";

export const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');

    // We use 'history' to navigate to the home page after a successful login
    const history = useHistory();

    const handleRegisterAccount = async (e) => {
        e.preventDefault();
    
        try {
            if (pass !== confirmPass) {
                setError("Password and confirm password do not match.");
            } else {
                await createUserWithEmailAndPassword(getAuth(), email, pass); 
                history.push("/");
            }
        } catch (error) {
            // Handle errors, e.g., display an error message
            setError(error.message);
        }
    };

    return (
        <div className="register-box">
            <h2>Registration</h2>
            {error && <p className="error">{error}</p>}
        <form className="register-form" onSubmit={handleRegisterAccount}>
            <label htmlFor="name">Name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Enter your email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" id="password" name="password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="Re-enter your password" id="confirmPassword" name="confirmPassword" />
            <button className="register-button-generic" type="submit">Register</button>
        </form>
        <button className="register-link-button-generic" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
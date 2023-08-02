import React, { useState } from "react";
import "../styles/Register.css";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Send the user data to the backend API using Fetch
          const response = await fetch("http://localhost:5000/apiv1/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: pass,
            }),
          });
    
          // Convert the response to JSON
          const data = await response.json();
    
          // Handle the response from the backend
          console.log("New user created:", data);
    
          // Reset the form after successful registration
          setName("");
          setEmail("");
          setPass("");
        } catch (error) {
          // Handle errors, e.g., display an error message
          console.error("Failed to create user:", error);
        }
    };

    return (
        <div className="register-box">
            <h2>Registeration</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Enter email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter password" id="password" name="password" />
            <button className="register-button-generic" type="submit">Register</button>
        </form>
        <button className="register-link-button-generic" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import "../styles/ForgotPassword.css";

function ForgotPassword() {

    const [email, setEmail] = useState('');

    const forgotPassword = () => {
        sendPasswordResetEmail(getAuth(), email)
        .then(() => { alert("Password reset email sent! Please check your email.") })
        .catch((error) => { alert(error); })
    }
  return (
    <div className='forgotpassword-box'>
      <h2>Forgot Password</h2>
            <form className="forgotpassword-form">
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    name="email" />
                <button className="send-reset-btn" onClick={() => forgotPassword()}>Send Reset Email</button>
                <Link to="/login" className="back-login-button">Return to Loing Page</Link>
            </form>
            {/* <Link to="/login" className="back-login-button">Return to Loing Page</Link> */}
    </div>
  );
}

export default ForgotPassword;

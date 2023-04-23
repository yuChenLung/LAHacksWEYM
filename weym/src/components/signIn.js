import React from 'react';
import './components.css';
import { useDatabase } from "../context/state";

function SignIn() {
    const database = useDatabase();
    return (
        <div className={`${database.signIn.showSignIn ? "show" : "hide"} signInBox`}>
            <h1 style={{ textAlign: 'center' }}>Sign In</h1>
            <form className="signIn">
                <label>Email:</label>
                <input
                    className="horiz-field"
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                />
                <label>Password:</label>
                <input
                    className="horiz-field"
                    type="text"
                    name="password"
                    placeholder="Enter your password"
                />
                <button className="submitButton" type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default SignIn;
import React from 'react';
import './components.css';
import { useDatabase } from "../context/state";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const context = useDatabase();
    const navigate = useNavigate();
    const [validCredentials, setValidCredentials] = useState(true)

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log("Input", formJson);

        try {
            const response = await fetchData(formJson);
            console.log("UID: ", response);

            // Handle the response data here
            if (response && validCredentials) {
                context.user.setUID(response.userId);
                context.signIn.setSignedIn(true);
                context.signIn.setShowSignIn(false);
                localStorage.setItem("userId", response.userId);
                localStorage.setItem("signedIn", true);
                navigate('/app');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here
        }
    }

    async function fetchData(data) {
        try {
            const response = await fetch('http://localhost:8001/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(response.ok);
            if (response.ok) {
                setValidCredentials(true)
                navigate('/')
            } else {
                setValidCredentials(false)
                return null
            }
            let json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    return (
        <div className={`${context.signIn.showSignIn ? "show" : "hide"} signInBox`}>
            <h1 style={{ textAlign: 'center' }}>Sign In</h1>
            <form className="signIn" onSubmit={handleSubmit}>
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
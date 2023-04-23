import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faUser, faCarSide } from '@fortawesome/free-solid-svg-icons';
import { useDatabase } from "../context/state";

function NavBar() {
    // const [show, setShow] = React.useState(false);
    const context = useDatabase();
    const navigate = useNavigate();

    const handleSignInClick = (e) => {
        e.preventDefault();
        context.signIn.setShowSignIn();
    }

    const handleLogOutClick = (e) => {
        e.preventDefault();
        context.signIn.setSignedIn();
        context.user.setUID('');
        navigate('/onboarding');
    }

    async function fetchProposedSchedule(proposalId) {
        try {
            const response = await fetch('http://localhost:8001/pschedule/' + proposalId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let json = await response.json()
            return json
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async function fetchUserData(uid) {
        try {
            const response = await fetch('http://localhost:8001/' + uid, { //context.user.uid, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async function handleDropPropClick(e) {
        var userData = null;

        context.navBar.setProposalDropdown();
        if (!context.navBar.showProposalDropdown) {
            userData = await fetchUserData('644484d880bc9840d9f2b800');
            console.log(userData);
        }

        if (userData && userData.proposedSchedules.length !== 0) {
            var schedules = [];
            var senderProposalInfo = [];
            var currProp = null;
            var currPropSender = null;
            for (var i = 0; i < userData.proposedSchedules.length; i++) {
                console.log(i)
                currProp = await fetchProposedSchedule(userData.proposedSchedules[i]);
                currPropSender = await fetchUserData(currProp["user"]);
                schedules.push(currProp);
                senderProposalInfo.push(currPropSender);
            }
            // Make a useState to save schedules
        }
    }


    if (context.signIn.signedIn) {
        return (
            // JSX code to render component goes here
            <div className="nav-bar">
                <div className="nav-bar-left">
                    <Link to="/"><img src={logo} width="100px" /></Link>
                </div>
                <div className="nav-bar-right">
                    {/* add eco friendly stats */}
                    <div className="dropdown">
                        <button className="dropProposalbtn" onClick={handleDropPropClick}><FontAwesomeIcon icon={faCarSide} size="lg" /></button>
                        <div id="proposalDropdown" style={{ borderRadius: '15px' }} className={`dropdown-content ${context.navBar.showProposalDropdown ? "showDropdown" : ""}`}>
                            {/* {proposals} */}
                            <p style={{ textAlign: "center" }}>No pending requests!</p>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => context.navBar.setProfileDropdown()}><FontAwesomeIcon icon={faUser} size="lg" /></button>
                        <div id="profileDropdown" className={`dropdown-content ${context.navBar.showProfileDropdown ? "showDropdown" : ""}`}>
                            <Link to="/profile">View Profile</Link>
                            <Link to="/onboarding">
                                <button onClick={handleLogOutClick}>Log out</button>
                            </Link>
                            <Link to="/create-trip">Create a Trip</Link>
                            {/* add onclick for login function */}
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    else {
        return (
            // JSX code to render component goes here
            <div className="nav-bar">
                <div className="nav-bar-left">
                    <Link to="/onboarding"><img src={logo} width="100px" alt="Carpool Logo" /></Link>
                </div>
                <div className="nav-bar-right">
                    {/* on click func */}
                    <Link to="/onboarding">
                        <button className="dropbtn" style={{ fontSize: '18px' }} onClick={handleSignInClick}>Sign in <FontAwesomeIcon icon={faUser} size="lg" /></button>
                    </Link>
                    {/* connect to onboarding page */}
                </div>
            </div >
        );
    }

}

export default NavBar;
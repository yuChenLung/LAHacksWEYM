import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCarSide, faCat } from '@fortawesome/free-solid-svg-icons';
import { useDatabase } from "../context/state";

function NavBar(props) {
    // async function fetchUserData() {
    //     let uid = '6443cd3b66d2a4511b0d3837'
    //     try {
    //         const response = await fetch('http://localhost:8001/' + uid, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         });
    //         let json = await response.json()
    //         return json
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         return null;
    //     }
    // }

    /* fetch proposals from user data and then uncomment proposals and make the card */

    // fetchUserData().then((data) => {
    //     console.log(data);
    // });

    const database = useDatabase();
    const handleSignInClick = (e) => {
        e.preventDefault();
        database.signIn.setSignIn();
    }

    if (props.signedIn) {
        return (
            // JSX code to render component goes here
            <div className="nav-bar">
                <div className="nav-bar-left">
                    <Link to="/"><FontAwesomeIcon className="fa-light" style={{ color: 'white' }} icon={faCat} /></Link>
                </div>
                <div className="nav-bar-right">
                    {/* add eco friendly stats */}
                    <div className="dropdown">
                        <button className="dropProposalbtn" onClick={() => database.navBar.setProfileDropdown()}><FontAwesomeIcon icon={faCarSide} size="lg" /></button>
                        <div id="profileDropdown" style={{ borderRadius: '15px' }} className={`dropdown-content ${database.navBar.showProfileDropdown ? "showDropdown" : ""}`}>
                            {/* {proposals} */}
                            <p style={{ textAlign: "center" }}>No pending requests!</p>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => database.navBar.setProposalDropdown()}><FontAwesomeIcon icon={faUser} size="lg" /></button>
                        <div id="profileDropdown" className={`dropdown-content ${database.navBar.showProposalDropdown ? "showDropdown" : ""}`}>
                            <Link to="/profile">View Profile</Link>
                            <Link to="/">Log out</Link>
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
                    <Link to="/"><img src={logo} width="100px" alt="Carpool Logo" /></Link>
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
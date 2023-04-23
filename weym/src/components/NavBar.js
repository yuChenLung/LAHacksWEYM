import React, { useEffect } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCarSide } from '@fortawesome/free-solid-svg-icons';
import { useDatabase } from "../context/state";
import ProposalCard from './proposalCard.js';

function NavBar(props) {
    const database = useDatabase();
    const handleSignInClick = (e) => {
        e.preventDefault();
        database.signIn.setSignIn();
    }

    let uid = '644484d880bc9840d9f2b800';

    /* fetch proposals from user data and then uncomment proposals and make the card */
    (() => {
        async function fetchUserData(uid) {
            try {
                const response = await fetch('http://localhost:8001/' + uid, {
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

        const data = await fetchUserData(uid);
        console.log(data);

        // fetchUserData(uid).then((data) => {
        //     if (data.proposedSchedules !== null) {
        //         var schedules = [];
        //         for (var i = 0; i < data.proposedSchedules.length; i++) {
        //             fetchProposedSchedule(data.proposedSchedules[i]).then((content) => {
        //                 schedules.push(content);
        //             })
        //         }
        //         database.updateProposals(schedules);
        //     }
        // });
        // var senderProposalInfo = [];
        // for (var i = 0; i < database.proposals.length; i++) {
        //     fetchUserData(database.proposals[i]["user"]).then((userData) => {
        //         senderProposalInfo.push(userData);
        //     })
        // }
        // database.updateSendersInfo(senderProposalInfo);
        // console.log(database.sendersProposalInfo);
    }, []);

    console.log(database.proposals);
    console.log(database.sendersProposalInfo);

    // const proposals = Array.from({ length: database.senderProposalInfo.length }, (_, index) => {
    //     return <ProposalCard key={index} />;
    // });

    if (props.signedIn) {
        return (
            // JSX code to render component goes here
            <div className="nav-bar">
                <div className="nav-bar-left">
                    <Link to="/"><img src={logo} width="100px" /></Link>
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
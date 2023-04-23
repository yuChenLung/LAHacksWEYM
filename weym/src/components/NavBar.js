import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faUser, faCarSide, faCat } from '@fortawesome/free-solid-svg-icons';
import { useDatabase } from "../context/state";
import ProposalCard from './proposalCard';

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
        context.signIn.setProfileDropdown();
        localStorage.clear();
        navigate('/onboarding');
    }

    const handleProfileClick = (e) => {
        e.preventDefault();
        context.navBar.setProfileDropdown();
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
            const response = await fetch('http://localhost:8001/' + uid, {
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
        e.preventDefault();
        var userData = null;

        context.navBar.setProposalDropdown();
        if (!context.navBar.showProposalDropdown) {
            userData = await fetchUserData(localStorage.getItem("userId"));
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
            context.proposal.updateProposals(schedules);
            context.proposal.updateSendersInfo(senderProposalInfo);
        }
        // console.log(context.proposal.proposals);
        // console.log(context.proposal.sendersProposalInfo);
    }

    if (localStorage.getItem("signedIn") !== null && localStorage.getItem("signedIn")) {
        return (
            // JSX code to render component goes here
            <div className="nav-bar">
                <div className="nav-bar-left">
                    <Link to="/"><FontAwesomeIcon className="fa-light" style={{ color: 'white' }} icon={faCat} /></Link>
                </div>
                <div className="nav-bar-right">
                    {/* add eco friendly stats */}
                    <div className="dropdown">
                        <button className="dropProposalbtn" onClick={handleDropPropClick}><FontAwesomeIcon icon={faCarSide} size="lg" /></button>
                        <div id="proposalDropdown" style={{ borderRadius: '15px' }} className={`dropdown-content-proposal dropdown-content ${context.navBar.showProposalDropdown ? "showDropdown" : ""}`}>
                            {context.proposal.sendersProposalInfo["length"] > 0 ? Array.from({ length: context.proposal.sendersProposalInfo["length"] }, (v, index) => {
                                return <ProposalCard key={index} i={index} />;
                            }) : <p style={{ textAlign: "center" }}>No pending requests!</p>}
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => context.navBar.setProfileDropdown()}><FontAwesomeIcon icon={faUser} size="lg" /></button>
                        <div id="profileDropdown" className={`dropdown-content ${context.navBar.showProfileDropdown ? "showDropdown" : ""}`}>
                            <Link to="/create-trip" onClick={handleProfileClick}>Create a Trip</Link>
                            <Link to="/profile" onClick={handleProfileClick}>View Profile</Link>
                            <Link to="/onboarding" onClick={handleLogOutClick}>Log out</Link>
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
                        <button className="dropbtn" style={{ fontSize: '16px' }} onClick={handleSignInClick}>Sign in <FontAwesomeIcon icon={faUser} size="lg" /></button>
                    </Link>
                    {/* connect to onboarding page */}
                </div>
            </div >
        );
    }

}

export default NavBar;
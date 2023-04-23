import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDatabase } from '../context/state';
import { useNavigate } from 'react-router-dom';

function NavBar(props) {
    const [show, setShow] = React.useState(false);
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
                        <button className="dropbtn" onClick={() => setShow(!show)}><FontAwesomeIcon icon={faUser} size="lg" /></button>
                        <div id="profileDropdown" className={`dropdown-content ${show ? "showDropdown" : ""}`}>
                            <Link to="/profile">View Profile</Link>
                            <Link to="/onboarding">
                                <button onClick={handleLogOutClick}>Log out</button>
                            </Link>
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
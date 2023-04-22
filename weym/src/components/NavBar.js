import React from 'react';
import logo from '../logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function NavBar(props) {
    const [show, setShow] = React.useState(false);

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
                        <button className="dropbtn" onClick={() => setShow(!show)}><FontAwesomeIcon icon={faUser} size="lg" /></button>
                        <div id="profileDropdown" className={`dropdown-content ${show ? "show" : ""}`}>
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
                        <button className="dropbtn" style={{ fontSize: '18px' }}>Sign in <FontAwesomeIcon icon={faUser} size="lg" /></button>
                    </Link>
                    {/* connect to onboarding page */}
                </div>
            </div >
        );
    }

}

export default NavBar;
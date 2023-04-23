import React from 'react';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function TripCard() {


    return (
        <div className="tripCard">
            <div className="tripCardTitle">
                <p className="tripCardTime">4:30 PM</p>
                <p className="tripCardName">Trip Name</p>
            </div>
            <div className="tripCardLocation">
                <span><FontAwesomeIcon icon={faLocationDot} /> start location <FontAwesomeIcon icon={faArrowRight} size="xs" /> end location</span>
            </div>
        </div>
    )
}

export default TripCard;
import React from 'react';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDatabase } from '../context/state';
import { faLocationDot, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function TripCard(props) {
    const context = useDatabase();
    const trip = context.tripData[props.i];
    const startTimeHour = Math.floor(trip["startTime"] / 60);
    const startTimeHourLabel = startTimeHour > 12 ? startTimeHour - 12 : startTimeHour / 60;
    const startTimeLabel = startTimeHourLabel + ':' + trip["startTime"] % 60;

    return (
        <div className="tripCard">
            <div className="tripCardTitle">
                <p className="tripCardTime">{startTimeLabel}</p>
                <p className="tripCardName">name</p>
            </div>
            <div className="tripCardLocation">
                <span><FontAwesomeIcon icon={faLocationDot} /> start location <FontAwesomeIcon icon={faArrowRight} size="xs" /> end location</span>
            </div>
        </div>
    )
}

export default TripCard;
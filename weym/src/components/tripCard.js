import React from 'react';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDatabase } from '../context/state';
import { faLocationDot, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function TripCard(props) {
    const context = useDatabase();
    const trip = context.tripData[props.i];
    const startTimeHour = Math.floor(trip["startTime"] / 60);
    const startTimeHourLabel = startTimeHour > 12 ? startTimeHour - 12 : startTimeHour;
    const startTimeMinuteLabel = trip["startTime"] % 60 < 10 ? '0' + trip["startTime"] % 60 : trip["startTime"] % 60;
    const startTimeLabel = startTimeHourLabel + ':' + startTimeMinuteLabel;

    return (
        <div className="tripCard">
            {/* <p>{trip["user"] ? 'planned' : 'scheduled'}</p> */}
            <div className="tripCardLocation">
                <p className="tripCardTime">{startTimeLabel}</p>
                <p><FontAwesomeIcon icon={faLocationDot} /> {trip["startLocation"]} <FontAwesomeIcon icon={faArrowRight} size="xs" /> {trip["destination"]}</p>
            </div>
        </div>
    )
}

export default TripCard;
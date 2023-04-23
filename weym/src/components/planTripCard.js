import React, { useState } from 'react';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function PlanTripCard(props) {
    const [matchArr, setMatchArr] = useState([]);

    async function handleCardClick() {
        const matchData = await fetchMatchData(props.oid);
        console.log("matches arr:", matchData.matches);
        var dataArr = [];
        var temp = null;
        // for (var i = 0; i < matchData.length; i++) {
        //     temp = await fetchCardData(matchData[i]);
        //     console.log(temp)
        //     // dataArr.push()
        // }
    }

    async function fetchCardData(oid) {
        try {
            const response = await fetch('http://localhost:8001/pschedule/' + oid, {
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

    async function fetchMatchData(oid) {
        try {
            const response = await fetch('http://localhost:8001/matches/' + oid, {
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

    return (
        <button onClick={ handleCardClick }>
            <div className="pTripCard">
                <div className="pTripCardTitle">
                    <p className="pTripCardTime">4:30 PM</p>
                    <p className="pTripCardName">Trip Name</p>
                </div>
                <div className="pTripCardLocation">
                    <span><FontAwesomeIcon icon={faLocationDot} /> start location <FontAwesomeIcon icon={faArrowRight} size="xs" /> end location</span>
                </div>
            </div>
        </button>
    )
}

export default PlanTripCard;
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserGroup, faClock } from '@fortawesome/free-solid-svg-icons';

export default function LandingPage() {

    return (
        <div class="grid-container">
            <div class="landingHeader">
                <h1>WEYM: Carpool for Carbon</h1>
            </div>
            <div class="landingMain">
                <p>Why Carpool?</p>
                <div>
                    <p>Environmental Benefits</p>
                    <ul>
                        <li>Reduce Greenhouse Gas Emissions</li>
                        <li>Reduce carbon footprint</li>
                        <li>Reduce Vehicle Miles Travelled (VML)</li>
                        <li>Decrease Air and Noise Pollution</li>
                    </ul>
                </div>
                <div>
                    <p>Additional Benefits</p>
                    <ul>
                        <li>Spend less money on Gas</li>
                        <li>Employers can reduce # of vehicles provided</li>
                        <li>Reduce need for extra land to provide parking</li>
                        <li>Drive in the High Occupancy Vehicle (HOV) or carpool lane to save time </li>
                        <li>and more!</li>
                    </ul>
                </div>
            </div>
            <div class="landingRight">
                <p>WEYM features</p>
                <p><FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }} />Create a trip</p>
                <p><FontAwesomeIcon icon={faUserGroup} size="xs" style={{ marginRight: '10px' }} />Join a carpool</p>
                <p><FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '10px' }} />View your trip schedule</p>
            </div>
            <div class="landingFooter">
                Did you know that driving with just one other person can reduce your annual GHG footprint by 2,000 pounds (1 ton) or more?
            </div>
        </div>
    )
}
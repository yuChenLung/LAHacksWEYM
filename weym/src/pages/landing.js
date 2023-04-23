import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserGroup, faClock, faShoePrints } from '@fortawesome/free-solid-svg-icons';

export default function LandingPage() {

    return (
        <div class="grid-container">
            <div class="landingHeader">
                <h1>WEYM: Carpool for Carbon</h1>
            </div>
            <div class="landingMain">
                <p style={{ fontSize: '40px' }}><b>Why Carpool?</b></p>
                <p style={{ fontSize: '22px' }}><b>Environmental Benefits</b></p>
                <ul className="landingText">
                    <li>Reduce Greenhouse Gas Emissions</li>
                    <li>Reduce carbon footprint</li>
                    <li>Reduce Vehicle Miles Travelled (VML)</li>
                    <li>Decrease Air and Noise Pollution</li>
                </ul>
                <p style={{ fontSize: '22px' }}><b>Additional Benefits</b></p>
                <ul className="landingText">
                    <li>Spend less money on Gas</li>
                    <li>Employers can reduce # of vehicles provided</li>
                    <li>Reduce need for extra land to provide parking</li>
                    <li>Utilize the High Occupancy Vehicle (HOV) lane to save time </li>
                    <li>and more!</li>
                </ul>
            </div>
            <div class="landingRight">
                <p style={{ fontSize: '40px' }}><b>WEYM features</b></p>
                <p style={{ fontSize: '22px' }}><FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }} />Create a Trip</p>
                <p style={{ fontSize: '22px' }}><FontAwesomeIcon icon={faUserGroup} size="xs" style={{ marginRight: '10px' }} />Join a Carpool</p>
                <p style={{ fontSize: '22px' }}><FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '10px' }} />View your Trip Schedule</p>
            </div>
            <div class="landingFooter">
                <p style={{ fontSize: '22px' }}>Did you know that driving with just one other person can reduce your annual GHG footprint <FontAwesomeIcon icon={faShoePrints} size="xs" /> by 2,000 pounds (1 ton) or more?</p>
            </div>
        </div >
    )
}
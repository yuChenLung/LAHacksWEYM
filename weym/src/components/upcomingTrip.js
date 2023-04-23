import React from 'react';
import './components.css';
import TripCard from './tripCard.js'

function UpcomingTrip() {
    function getWeekdayLabel(dayOfWeek) {
        switch (dayOfWeek) {
            case 1:
                return "Sunday";
            case 2:
                return "Monday";
            case 3:
                return "Tuesday";
            case 4:
                return "Wednesday";
            case 5:
                return "Thursday";
            case 6:
                return "Friday";
            case 7:
                return "Saturday";
        }
    }
    var onTrip = false;
    if (onTrip) {
        return (
            <div className="tripBox">
                <h1>{getWeekdayLabel(1)}</h1>
                <div className="timeline">
                    <div className="container">
                        <div className="left">
                            <p className="content">start time</p>
                        </div>
                        <span className="dot"></span>
                        <p className="location">start location</p>
                    </div>
                    <div style={{ marginTop: '50px' }} class="container">
                        <div className="left">
                            <p class="content">end time</p>
                        </div>
                        <span class="dot"></span>
                        <p className="location">end location</p>
                    </div>
                    {/* <p>start time</p>
                    <p>end time</p> */}
                </div>
                <div className="map">
                </div>
                {/* if it is a real schedule ride, show riders instead of carpooler!! */}
                <button className="findRidersButton"><span>Find a Carpooler</span></button>
            </div>
        );
    }
    else {
        var numberTrips = 3;

        const date = new Date();

        const tripCards = Array.from({ length: numberTrips }, (_, index) => {
            return <TripCard key={index} />;
        });

        if (numberTrips > 0) {
            return (
                <div className="tripBox">
                    {/* change this to get from backend */}
                    <h1>{getWeekdayLabel(date.getDay() + 1)}</h1>
                    <div>{tripCards}</div>
                </div>
            )
        }
        else {
            return (
                <div className="tripBox">
                    {/* change this to get from backend */}
                    <h1>{getWeekdayLabel(date.getDay() + 1)}</h1>
                    <p>You have no upcoming rides today :(</p>
                    <iframe className="gif" src="https://giphy.com/embed/oZ4hsNeuMpkSA" frameBorder="0"></iframe>
                    <button className="findRidersButton"><span>Schedule a Trip</span></button>
                </div>
            )
        }
    }
}

export default UpcomingTrip;
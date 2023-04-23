import React from 'react';
import './components.css';

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

    return (
        <div className="tripCard">
            {/* current day label <h4></h4> */}
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
        </div>
    );
}

export default UpcomingTrip;
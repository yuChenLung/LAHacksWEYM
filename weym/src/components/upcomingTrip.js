import React from 'react';
import './components.css';
import TripCard from './tripCard.js';
import { useDatabase } from '../context/state';
import CreateTripForm from './CreateTrip';

function UpcomingTrip() {
    const context = useDatabase()
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

    if (context.scheduler.tripClicked) {
        const startHour = Math.floor(context.scheduler.startTime / 60)
        const startMinNum = Math.floor(context.scheduler.startTime % 60)
        const startMinString = startMinNum === 0 ? String(startMinNum) + "0" : String(startMinNum)
        const startTimeLabel = startHour >= 12 ? startHour + ':' + startMinString + " PM" : startHour + ':' + startMinString + " AM";
        const endHour = Math.floor(context.scheduler.endTime / 60)
        const endMinNum = Math.floor(context.scheduler.startTime % 60)
        const endMinString = endMinNum === 0 ? String(startMinNum) + "0" : String(startMinNum)
        const endTimeLabel = endHour >= 12 ? endHour + ':' + endMinString + " PM" : endHour + ':' + endMinString + " AM";

        console.log(startMinNum, startMinString, endMinNum, endMinString)
        return (
            <div className="tripBox">
                <h1>{getWeekdayLabel(context.scheduler.day)}</h1>
                <div className="timeline">
                    <div className="container">
                        <div className="left">
                            <p className="content">{startTimeLabel}</p>
                        </div>
                        <span className="dot"></span>
                        <p className="location">{context.scheduler.startLocation}</p>
                    </div>
                    <div style={{ marginTop: '50px' }} class="container">
                        <div className="left">
                            <p class="content">{endTimeLabel}</p>
                        </div>
                        <span class="dot"></span>
                        <p className="location">{context.scheduler.destination}</p>
                    </div>
                    {/* <p>start time</p>
                    <p>end time</p> */}
                </div>
                <div className="map">
                </div>
                {/* if it is a real schedule ride, show riders instead of carpooler!! */}
                <div>
                    <button className="findRidersButton" onClick={() => context.setTripClicked(false)}><span>Back</span></button>
                    <button className="findRidersButton"><span>Find a Carpool</span></button>
                </div>
            </div>
        );
    }
    else if (context.createTrip) {
        return (
            <CreateTripForm />
        );
    }
    else {
        var numberTrips = 3;

        const date = new Date();

        const tripCards = Array.from({ length: numberTrips }, (_, index) => {
            return <TripCard key={index} i={index} />;
        });

        if (numberTrips > 0) {
            return (
                <div className="tripBox">
                    <h1>{getWeekdayLabel(date.getDay() + 1)}</h1>
                    <div>{tripCards}</div>
                    <button className="findRidersButton" onClick={() => context.setCreateTrip(true)}><span>Schedule a Trip</span></button>
                </div>
            )
        }
        else {
            return (
                <div className="tripBox">
                    <h1>{getWeekdayLabel(date.getDay() + 1)}</h1>
                    <p>You have no upcoming rides today :(</p>
                    <iframe className="gif" src="https://giphy.com/embed/oZ4hsNeuMpkSA" frameBorder="0"></iframe>
                    <button className="findRidersButton" onClick={() => context.setCreateTrip(true)}><span>Schedule a Trip</span></button>
                </div>
            )
        }
    }
}

export default UpcomingTrip;
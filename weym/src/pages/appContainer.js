import React from 'react'
import Scheduler from '../components/scheduler'
import UpcomingTrip from '../components/upcomingTrip'
import CreateTripForm from '../components/CreateTrip'

function AppContainer() {
    return (
        <div>
<<<<<<< HEAD
            <div style={{ display: 'flex', width: '100%' }}>
=======
            <div style={{ display: 'flex', width: "100%"}}>
>>>>>>> 29e19c7 (Click reflects on trip details)
                <div style={{ width: window.innerWidth * .28 }}>
                    {/* <CreateTripForm></CreateTripForm> */}
                    <UpcomingTrip></UpcomingTrip>
                </div>
                <Scheduler />
            </div>
        </div>

    )
}

export default AppContainer
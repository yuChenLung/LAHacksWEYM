import React from 'react'
import Scheduler from '../components/scheduler'
import UpcomingTrip from '../components/upcomingTrip'

function AppContainer() {
    return (
        <div>
            <div style={{ display: 'flex', width: "100%" }}>
                <div style={{ width: window.innerWidth * .28 }}>
                    <UpcomingTrip></UpcomingTrip>
                </div>
                <Scheduler />
            </div>
        </div>

    )
}

export default AppContainer
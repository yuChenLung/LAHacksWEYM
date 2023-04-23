import React from 'react'
import Scheduler from '../components/scheduler'
import UpcomingTrip from '../components/upcomingTrip'
import CreateTrip from '../components/CreateTrip'

function AppContainer() {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: window.innerWidth * .28 }}>
                    <CreateTrip></CreateTrip>
                    {/* <UpcomingTrip></UpcomingTrip> */}
                </div>
                <Scheduler />
            </div>
        </div>

    )
}

export default AppContainer
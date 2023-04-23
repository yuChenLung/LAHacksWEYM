import React from 'react'
import Scheduler from '../components/scheduler'
import UpcomingTrip from '../components/upcomingTrip'
import CreateTripForm from '../components/CreateTrip'

function AppContainer() {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: window.innerWidth * .28 }}>
                    <CreateTripForm></CreateTripForm>
                    {/* <UpcomingTrip></UpcomingTrip> */}
                </div>
                <Scheduler />
            </div>
        </div>

    )
}

export default AppContainer
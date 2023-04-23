import React from 'react'
import Scheduler from '../components/scheduler'
function AppContainer (){
    return(
        <div>
            The components of the app will be contained here:
            <div style={{height: "50px"}}>Temp Nav Bar</div>
            <div style={{display: 'flex'}}>
                <div style={{width: window.innerWidth * .28}}>Hello</div>
                <Scheduler />
            </div>
        </div>
        
    )
}

export default AppContainer
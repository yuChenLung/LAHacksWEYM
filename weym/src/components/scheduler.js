import React from "react";
import GridLayout from "react-grid-layout";
import { useDatabase } from "../context/state"
import "./scheduler.css";
import "../../node_modules/react-resizable/css/styles.css";


// every 5 minutes is 1 height => 12 height is one hour

let global_counter = 0

const timeHours = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];

const timeGrid = timeHours.map((time) => {
  return (
    <h5
      style={{
        paddingBottom: "83.5px",
        paddingLeft: "5px",
        position: "relative",
        zIndex: "auto",
      }}
    >
      {time}
    </h5>
  );
});

const numRowLines = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48,
];

const gridHorizontal = numRowLines.map((content) => {
  var time = <div style={{width: window.innerWidth * .04}}></div>
  if (content % 2 == 0 && content != 48){
    time = <div style={{position: 'relative', width: window.innerWidth * .04}}>{timeHours[content/2]}</div>
    // console.log(timeHours[content/2])
  }
  return (
    <div style={{display: 'flex', zIndex: 'auto', float: "left",}}>
      {time}
      <div
        style={{
          position: "relative",
          width: String(window.innerWidth * 0.70) + "px",
          backgroundColor: "#DEE2E6",
          height: "1px",
          marginTop: "61px",
          top: "-50px",
          zIndex: "-1",
        }}
      ></div>
    </div>
  );
});

const timeDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayGrid = timeDay.map((day) => {
    return <h3 style={{
              width: String(((window.innerWidth * .670))/7) + "px",
            }}>
                {day}
            </h3>
})

// console.log(window.innerWidth,String((window.innerWidth * .65) / 7))
const gridVertical = timeDay.map((day) => {
    let size = String((window.innerWidth * .670) / 7) 
    return <div style={{
                position: "relative",
                backgroundColor: "#DEE2E6",
                height: "2987px",
                width: "1px",
                margin: "0 " + size + "px 0 0"
            }}>

            </div>
})

    // Mainly for the initialization state when a user has already added or changed events in the user collection (saved)
  function dataToCoord (data){
    let x = data.day - 1
    let y = data.startTime / 5
    let h = (data.endTime - data.startTime) / 6
    let i = data._id
    return {i: i, x: x, y: y, h: h, w: 1}
  }

  // Function primarily used in the situation where the event is resized or redragged to update the database in the user's collection.
  function coordToDate(y, h){
      let startTime = ""
      let endTime = ""
      let hour = parseInt(y/12)
      let minutes = (y%12) * 5
      let strMinutes = String(minutes)
      let strHour = String(hour)
      strHour.length === 1 ? 
          startTime += "0" + hour + ":" : 
          startTime += hour + ":"
      strMinutes.length === 1 ? 
          startTime += "0" + strMinutes + ":00" : 
          startTime += strMinutes + ":00"
      
      let endMin = (((h-1) % 12) + parseInt(minutes/5))
      let endHour = String(parseInt((h-1) / 12) + hour + parseInt(endMin / 12))
      endMin %= 12
      let strEndMin = String(endMin * 5)

      endHour.length === 1 ?
          endTime += "0" + endHour + ":" :
          endTime += endHour + ":"
      strEndMin.length === 1 ?
          endTime += "0" + strEndMin + ":00" :
          endTime += strEndMin + ":00"
      return [startTime, endTime]
  }

  const timeConverter = (time) => {
    time = time.split(":"); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
    } else if (hours > 12) {
    timeValue = "" + (hours - 12);
    } else if (hours == 0) {
    timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
    timeValue += hours >= 12 ? " PM" : " AM"; // get AM/PM

    return timeValue;
};

const Scheduler = (props) => {
    const [scheduledTrips, setScheduledTrips] = React.useState([]);
    const [notDragging, setDragging] = React.useState(false)
    const [isClickingCard, setClicking] = React.useState(false)
    const [isClickingGrid, setClickingGrid] = React.useState(false)
    const [trips, setTrips] = React.useState([]); 
    const [numTrips, setNumTrips] = React.useState(0)
    const database = useDatabase()

    const reference = React.useRef()
    
    function handleCardClick(event) {
      event.stopPropagation()
      if (isClickingGrid === false){
        setClicking(true)
        console.log("Card Click")
      }
      // database.scheduler.setObject(event)
    }

    function handleGridClick(event) {
      console.log("Grid Click (-1)")
      if (isClickingCard === false){
        setClickingGrid(true)
        console.log("Grid Click")
        createScheduleRequest(event)
      }
    }

    // Need to change with regards to new system.
    function onDragStop(newSchedule, oldItem, newItem) {
        let overlap = false
        let index = NaN
        let oldSchedule = newSchedule
        let newTrips = trips
        for (let i = 0; i < newSchedule.length; i++){
            let current = scheduledTrips[i]
            let isOverlapping = ((current.x == newItem.x) && (((current.y <= newItem.y && newItem.y < (current.y + current.h - 1))) 
                              || (current.y < (newItem.y + newItem.h - 1) && (newItem.y + newItem.h - 1) <= (current.y + current.h - 1)) 
                              || (newItem.y <= (current.y) && current.y < (newItem.y + newItem.h - 1))
                              ))
            if (isOverlapping) {
              // console.log((current.y <= newItem.y && newItem.y < (current.y + current.h - 1)))
              // console.log("----")
              // console.log((current.y < (newItem.y + newItem.h - 1)))
              // console.log((newItem.y + newItem.h - 1) <= (current.y + current.h - 1))
              // console.log(current.y, (newItem.y + newItem.h - 1), (current.y + current.h - 1))
              // console.log("----")
              // console.log(newItem.y <= (current.y))
              // console.log(current.y <= (newItem.y + newItem.h - 1))
              // console.log(newItem.y, current.y, (newItem.y + newItem.h - 1))
            }
            if (newItem.i == current.i && (oldItem.y != newItem.y || oldItem.x != newItem.x)){
                index = i
            }
            if (current.i != newItem.i && isOverlapping){
              overlap = true
              //console.log("overlap detected")
            }
        }

        // Changing this to eventually make requests for changes.
        if ((index != 0 && !index)|| overlap){
          //console.log("handling no index/overlap")
          setDragging(false)
          if (overlap){
            oldSchedule[index] = oldItem
            setScheduledTrips(oldSchedule)
          }
          return
        }
        setScheduledTrips(newSchedule)
        // 1 unit change => 5 minutes change
        // let time = coordToDate(newSchedule[index].y, newSchedule[index].h)
        // let date = new Date(trips[index].userDate.replace(/-/g,'\/'))
        // let oldX = date.getDay()
        // let day = String(parseInt(trips[index].userDate.slice(8, 10)) + (newSchedule[index].x - oldX))
        //update(newEnd, newStart) ... updating the database for the specific user
        // if (day.length === 1) {
        //     day = "0" + day
        // }
        // newTrips[index].userStartTime = time[0]
        // newTrips[index].userEndTime = time[1]
        setTrips(newTrips)

        
        // let document = doc(db, '/users/QSkZGzfTyliTfbjKyAIo/events/' + trips[index].id)
        // updateDoc(document, {
        //     'userDate': trips[index].userDate.slice(0, 8) + day,
        //     'userStartTime': time[0],
        //     'userEndTime': time[1],
        // })
        setDragging(false)
    }

    // Assuming that (x = 0, y = 0, h = 0) => Sunday, 00:00 am (0 -> 144) + 0 (0 -> 12) minutes
    function onResizeStop(newSchedule) {
        // update database with provided metrics and update the scheduledTrips value in Scheduler using the index in
        let index = NaN
        for (let i = 0; i < newSchedule.length; i++){
            let current = scheduledTrips[i]
            let change = newSchedule[i]
            if ((current.x !== change.x) || (current.y !== change.y) || (current.h !== change.h)){
                index = i
                break
            }
        }
        if (index != 0 && !index){
            return
        }
        setScheduledTrips(newSchedule)
        let time = coordToDate(newSchedule[index].y, newSchedule[index].h)

        // Need to update MongoDB backend
        // let document = doc(db, '/users/QSkZGzfTyliTfbjKyAIo/events/' + trips[index].id)
        // updateDoc(document, {
        //     'userStartTime': time[0],
        //     'userEndTime': time[1],
        // })
    }

    async function createScheduleRequest(event){
      async function postData(jsonData){
        try {
          const response = await fetch('http://localhost:8001/pschedule', { 
              method: 'POST', 
              body: JSON.stringify(jsonData),
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          console.log(response)
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
      }
      setClickingGrid(false)
      // console.log(event.target.parentNode.parentNode.scrollTop)

      let gridXStart = reference.current.offsetLeft + window.innerWidth * .04
      let gridYStart = reference.current.offsetTop
    
      let offset = event.pageY - gridYStart - 13
      let scrollAmount = event.target.parentNode.parentNode.scrollTop

      let gridXEnd = gridXStart + window.innerWidth * .68
      let division = (gridXEnd - gridXStart)/7
      let i = 0
      for (;i < 7; i+=1){
        let nextGridX = gridXStart + division
        console.log(gridXStart, nextGridX)
        if (event.pageX >= gridXStart && event.pageX < nextGridX){
          break
        }
        gridXStart = nextGridX
      }
      
      let newX = i
      // Now i refers to the day of the actual event.
      console.log("Scroll Amount: ", scrollAmount)
      console.log("Offset: ", offset)
      let newY = Math.round((scrollAmount + offset)/61) * 6
      console.log("X, Y: ", newX, newY)

      let newScheduledTrips = scheduledTrips
      newScheduledTrips.push({i: global_counter, x: newX, y: newY, h: 20, w: 1})
      global_counter+=1

      let uid = '64450e42dae8d7fcbb04043f'
      const formattedJson = {
        user:  uid,
        startTime: newY * 5,
        endTime: 60 + newY * 5,
        day: newX + 1,
        startLocation: "home",
        destination: "school"
      }
      console.log(formattedJson);
      //format json object

      // Send post request to database
      try {
          const response = await postData(formattedJson);
          console.log(response);
          // Handle the response data here
      } catch (error) {
          console.error('Error fetching data:', error);
          // Handle the error here
      }
      setScheduledTrips(newScheduledTrips)
      setNumTrips(numTrips + 1)

      database.doRefresh()
    }
  
    React.useEffect(() => {
        // This would be replaced with a functional call to retrieve the events from the user collection-base
        //
        async function fetchData() {
          let uid = '64450e42dae8d7fcbb04043f'
          try {
              const response = await fetch('http://localhost:8001/' + uid, { 
                  method: 'GET', 
                  headers: {
                      'Content-Type': 'application/json'
                  },
              });
              let json = await response.json()
              let planned = []
              console.log(json)
              for (let i = 0; i < json.plannedSchedules.length; i+=1){
                console.log(json.plannedSchedules[i])
                let content = await fetchSchedule(json.plannedSchedules[i])
                planned.push(dataToCoord(content))
              }

              setScheduledTrips(planned)
              setNumTrips(json.plannedSchedules.length)
          } catch (error) {
              console.error('Error fetching data:', error);
              return null;
            }
        };
      
        async function fetchSchedule(id) {
          try {
              const response = await fetch('http://localhost:8001/pschedule/' + id, { 
                  method: 'GET', 
                  headers: {
                      'Content-Type': 'application/json'
                  },
              });
              let json = await response.json()
              return json
          } catch (error) {
              console.error('Error fetching data:', error);
              return null;
          }
        };
        fetchData()
    }, [database.refresh]);

    console.log(numTrips)
    let view = []
    for (let index = 0; index < numTrips; index++){
      view.push(
        <div
            key={scheduledTrips[index].i}
            onClick={(event) => {notDragging ? handleCardClick(event) : console.log("Currently dragging.")}}
            style={{
                // description
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "8px 12px 4px 8px",
                gap: "2px",
                overflowY: "hidden",

                // box
                boxSizing: "border-box",
                position: "absolute",
                borderRadius: "5px",
                background: "red",
              }}
          >
          </div>
      )
    }

    console.log(scheduledTrips)
    console.log(numTrips)
    console.log(view)

    return (
        <div style={{
            width: "72vw",
            height: "90vh",
            overflowY: "hidden",
            scrollbarWidth: "0px",
            borderRadius: "15px",
            // backgroundColor: "red",
        }}
        id="scheduler">
            <div style={{
                    display: "flex",
                    boxSizing: "border-box",
                    borderBottomColor: "#CED4DA",
                    zIndex: "2",
                    position: "relative",
                    marginLeft: "42px",

                }} className="gridDays">
                    {dayGrid}
            </div>
            <div onClick={(event) => {handleGridClick(event)}} style={{
                //backgroundColor: "red",
                display: 'flex',
                position: 'relative',
                zIndex: 'auto',
                overflowY: "scroll",
                height: "85vh",
                overflowX: "hidden",
            }} 
                ref={reference}
                className="gridContent">
                {/* <div style= {{
                    marginTop: "-20px",
                    height: "2985px",
                    position: "relative",
                    backgroundColor: "white"
                }}>
                    {timeGrid}
                </div> */}
                <div style={{position: "absolute", paddingLeft: window.innerWidth * .04}}>
                  <GridLayout allowOverlap={true} 
                              resizeHandles={['s']}
                              onDragStart={() => {setDragging(true); setClickingGrid(false)}}
                              onDragStop={(layout, oldItem, newItem) => onDragStop(layout, oldItem, newItem)}
                              onResizeStart={() => {setClickingGrid(false)}}
                              onResizeStop={(element) => onResizeStop(element)}
                              layout={scheduledTrips} 
                              draggable={false} 
                              cols={7} 
                              rowHeight={.335} 
                              width={(window.innerWidth * .68)}>
                    { view }
                  </GridLayout>
                </div>
                <div>
                    { gridHorizontal }
                </div>
                <div style={{
                    marginLeft: window.innerWidth * .0425,
                    position: "absolute",
                    zIndex: "-1",
                    display: "flex"
                }}>
                    { gridVertical }
                </div>
            </div>
        </div>
    );
}
export default Scheduler;

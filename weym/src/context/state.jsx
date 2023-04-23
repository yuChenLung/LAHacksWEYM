import React, {createContext, useContext, useState, useEffect} from 'react'

const dataState = createContext()

export const useDatabase = () => {
  return useContext(dataState)
}

const DataWrapper = ({children}) => {
  const [scheduleObject, setScheduleObject] = useState(undefined)
  const [schedulerActive, setSchedulerActive] = useState(false)

  const [refresh, setRefresh] = useState(0)

  const [latitude, setLatitude] = useState(34.063914)
  const [longitude, setLongitude] = useState(-118.448699)

  const [uid, setUserID] = useState('')

  useEffect(() => {
    // Whenever a value is updated (i.e. the scheduler data, or the geolocation, it will call this use effect)
    console.log("Filler code")
  })

  /*
    Global Datatype: 
    {
        type: string,
        name: string,
        timed: boolean,
        address: string,
        location: number[],
        date: string | null,
        startTime: string | null, 
        endTime: string | null,
        userDate: string | null,
        userStartTime: string | null, 
        userEndTime: string | null, 
        link: string | null,
        description: string | null
        tags: string[]
    }
     */

  const updateScheduler = data => {
    if (data === undefined) {
      setScheduleObject(undefined)
      setSchedulerActive(false)
      setRefresh(refresh + 1)
      return
    }

    setScheduleObject(data)
    setSchedulerActive(true)
  }

  const updateUID = data => {
    setUserID(data)
    return
  }

  const updateLocation = (lat, long) => {
    setLatitude(lat)
    setLongitude(long)
  }

  const updateRefresh = () => {
    setRefresh(refresh + 1)
  }

  return (
    <div>
        <dataState.Provider
          value={{
            // All of the values listed here are available to be referenced among the children components.
            scheduler: {
              active: schedulerActive,
              object: scheduleObject,
              setObject: updateScheduler
            },
            refresh: refresh,
            doRefresh: updateRefresh,
            user: {
              uid: uid,
              latitude: latitude,
              longitude: longitude,
              setLocation: updateLocation,
              setUID: updateUID,
            }
          }}
        >
          {children}
        </dataState.Provider>
    </div>
  )
}

export default DataWrapper
import React, { createContext, useContext, useState, useEffect } from 'react'

const dataState = createContext()

export const useDatabase = () => {
  return useContext(dataState)
}

const DataWrapper = ({ children }) => {
  const [endTime, setEndTime] = useState(undefined)
  const [startTime, setStartTime] = useState(undefined)
  const [day, setDay] = useState(undefined)
  const [startLocation, setStartLocation] = useState(undefined)
  const [destination, setEndLocation] = useState(undefined)
  const [tripClicked, setTripClicked] = useState(false)

  const [refresh, setRefresh] = useState(0)

  const [latitude, setLatitude] = useState(34.063914)
  const [longitude, setLongitude] = useState(-118.448699)

  const [uid, setUserID] = useState('')
  const [signedIn, setSignedIn] = useState(false)
  const [showSignedIn, setShowSignedIn] = useState(false)

  const [showProfileDropdown, setProfileDropdown] = useState(false)
  const [showProposalDropdown, setProposalDropdown] = useState(false)

  const [validCredentials, setValidCredentials] = useState(true)

  const [proposals, setProposals] = useState([])
  const [sendersProposalInfo, setSendersInfo] = useState([])

  const [plannedEvents, setPlannedEvents] = useState([])
  const [createTrip, setCreateTrip] = useState(false)

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

  const updateScheduler = (s, e, d, t) => {
    if (s === undefined || e === undefined || d === undefined) {
      setEndTime(undefined)
      setStartTime(undefined)
      setDay(undefined)
      setRefresh(refresh + 1)
      return
    }

    setEndTime(e)
    setStartTime(s)
    setDay(d)
    setRefresh(refresh + 1)
    setTripClicked(t)
  }

  const updateDestinations = (start, end) => {
    if (start == undefined || end == undefined) {
      setStartLocation(undefined)
      setEndLocation(undefined)
    }

    setStartLocation(start)
    setEndLocation(end)
    setRefresh(refresh + 1)
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

  const updateSignIn = () => {
    setSignedIn(!signedIn)
  }

  const updateShowSignIn = () => {
    setShowSignedIn(!showSignedIn)
  }

  const updateProfileDropdown = () => {
    setProfileDropdown(!showProfileDropdown)
  }

  const updateProposalDropdown = () => {
    setProposalDropdown(!showProposalDropdown)
  }

  const updateValidCredentials = (valid) => {
    setValidCredentials(valid)
  }

  const updateProposals = (proposals) => {
    setProposals(proposals)
  }

  const updateSendersInfo = (sendersInfo) => {
    setSendersInfo(sendersInfo)
  }

  const updatePlannedEvents = (data) => {
    setPlannedEvents(data)
  }

  const updateTripClicked = (t) => {
    setTripClicked(t)
  }

  const updateCreateTrip = (trip) => {
    setCreateTrip(trip)
  }

  return (
    <div>
      <dataState.Provider
        value={{
          // All of the values listed here are available to be referenced among the children components.
          scheduler: {
            startTime: startTime,
            endTime: endTime,
            day: day,
            startLocation: startLocation,
            destination: destination,
            tripClicked: tripClicked,
            setDestinations: updateDestinations,
            setSchedule: updateScheduler
          },
          matches: {
            plannedEvents: plannedEvents,
            updatePlannedEvents: updatePlannedEvents,
          },
          refresh: refresh,
          doRefresh: updateRefresh,
          user: {
            uid: uid,
            latitude: latitude,
            longitude: longitude,
            setLocation: updateLocation,
            setUID: updateUID,
          },
          signIn: {
            signedIn: signedIn,
            showSignIn: showSignedIn,
            setSignedIn: updateSignIn,
            setShowSignIn: updateShowSignIn,
          },
          navBar: {
            showProfileDropdown: showProfileDropdown,
            showProposalDropdown: showProposalDropdown,
            setProfileDropdown: updateProfileDropdown,
            setProposalDropdown: updateProposalDropdown,
          },
          credentials: {
            validCredentials: validCredentials,
            setValidCredentials: updateValidCredentials,
          },
          proposal: {
            proposals: proposals,
            updateProposals: updateProposals,
            sendersProposalInfo: sendersProposalInfo,
            updateSendersInfo: updateSendersInfo,
          },
          setTripClicked: updateTripClicked,
          createTrip: createTrip,
          setCreateTrip: updateCreateTrip,
        }}
      >
        {children}
      </dataState.Provider>
    </div>
  )
}

export default DataWrapper
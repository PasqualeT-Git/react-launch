import React, { useEffect, useState } from "react";
import './tableLaunches.css'

export const TableLaunches = ({ dates, setLaunchesTotal, setLocations, setCoordinates }) => {
  const [ launchesData, setLaunchesData ] = useState([])
  const [ nextPage, setNextPage ] = useState(null)
  const [ previousPage, setPreviousPage ] = useState(null)

 
  const buildParams = ( object ) => {
    let queryString = '?'
    
    for (let [ key, value ] of Object.entries(object)) {
      if (key === 'startDate') {
        queryString += `net__gte=${value.replace(/:/g, '%3A')}`
      } else {
        queryString += `&net__lte=${value.replace(/:/g, '%3A')}`
      }
    }

    return queryString
  }

  useEffect(() => {
    if (Object.keys(dates).length > 0) {
      (async () => {
        const queryParams = buildParams(dates)
        const endpoint = 'https://lldev.thespacedevs.com/2.2.0/launch/' + queryParams
        const res = await fetch(endpoint)
        const resJson = await res.json()

        const totalLaunches = await resJson.count
        const dataResults = await resJson.results
        const next = await resJson.next
        const previous = await resJson.previous 
        console.log(dataResults);
        const locations = dataResults.map(launch => launch.pad.location.country_code)
        const coordinates = dataResults.map(launch => {
          return { 'coordinates': [launch.pad.longitude, launch.pad.latitude] }
        })

        setNextPage(next)
        setPreviousPage(previous)
        setLaunchesTotal(totalLaunches)
        setLaunchesData(dataResults)
        setLocations(locations)
      setCoordinates(coordinates)

      })()
    }
  },[setLaunchesData, dates, setLaunchesTotal, setLocations, setCoordinates])
  
  const handlePrevious = async () => {
    const endpoint = previousPage
    const res = await fetch(endpoint)
    const resJson = await res.json()

    const dataResults = await resJson.results
    const next = await resJson.next
    const previous = await resJson.previous
    
    const locations = dataResults.map(launch => launch.pad.location.country_code)
    const coordinates = dataResults.map(launch => {
      return { 'coordinates': [launch.pad.longitude, launch.pad.latitude] }
    })
    
    setNextPage(next)
    setPreviousPage(previous)
    setLaunchesData(dataResults)
    setLocations(locations)
    setCoordinates(coordinates)
  }

  const handleNext = async () => {
    const endpoint = nextPage
    const res = await fetch(endpoint)
    const resJson = await res.json()

    const dataResults = await resJson.results
    const next = await resJson.next
    const previous = await resJson.previous 
    
    const locations = dataResults.map(launch => launch.pad.location.country_code)
    const coordinates = dataResults.map(launch => {
      return { 'coordinates': [launch.pad.longitude, launch.pad.latitude] }
    })

    setNextPage(next)
    setPreviousPage(previous)
    setLaunchesData(dataResults)
    setLocations(locations)
    setCoordinates(coordinates)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Launch Window Start</th>
            <th>Launch Window End</th>
            <th>Rocket name</th>
          </tr>
        </thead>
        <tbody>
          {launchesData.map(launch => {
            return  <tr key={launch.id}>
                      <td>{launch.name}</td>
                      <td>{launch.pad.name}</td>
                      <td>{launch.window_start}</td>
                      <td>{launch.window_end}</td>
                      <td>{launch.rocket.configuration.name}</td>
                    </tr>
          })}
        </tbody>
      </table>
      <div id="nav_buttons">
          <div>
            {previousPage && <button  id="prev" onClick={handlePrevious}>Prev</button>}
          </div>
          <div>
            {nextPage && <button  id="next" onClick={handleNext}>Next</button>}
          </div>
      </div>
    </>
  )
} 
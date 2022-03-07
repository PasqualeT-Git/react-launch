import './App.css';
import React, { useState } from 'react';
import { SearchBar } from '../searchBar/SearchBar'
import { TableLaunches } from '../tableLaunches/TableLaunches';
import { ChartLaunches } from '../chartLaunches/ChartLaunches'

function App() {
  const [ dates, setDates ] = useState({})
  const [ launchesTotal, setLaunchesTotal ] = useState(0)
  const [ locations, setLocations ] = useState([])

  const containerStyle = {
    margin: '24px auto',
    maxWidth: '1024px',
  }

  const searchBarCb =({ start, end }) => {
    setDates(prevState => {
      return { ...prevState, 'startDate': start, 'endDate': end }
    })
  }

  return (
    <div className="App" style={containerStyle} >
      <SearchBar searchBarCb={searchBarCb}/>
      <p style={{float: 'left', marginTop: '48px'}}>Founded <strong>{launchesTotal}</strong> launches:</p>
      <TableLaunches  dates={dates} 
                      setLaunchesTotal={setLaunchesTotal} 
                      setLocations={setLocations}/>

      <ChartLaunches  locations={locations}/>
    </div>
  );
}

export default App;

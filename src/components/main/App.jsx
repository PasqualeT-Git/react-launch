import './App.css';
import React, { useState } from 'react';
import { SearchBar } from '../searchBar/searchBar'
import { TableLaunches } from '../tableLaunches/tableLaunches';

function App() {
  const [ dates, setDates ] = useState({})
  const [ launchesTotal, setLaunchesTotal ] = useState(0)

  const containerStyle = {
    margin: '24px auto',
    maxWidth: '1024px',
  }

  const searchBarCb =({ start, end }) => {
    setDates(prevState => {
      return { ...prevState, 'startDate': start, 'endDate': end }
    })
  }

  const totalLaunchesCb = (total) => { setLaunchesTotal(total) }

  return (
    <div className="App" style={containerStyle} >
      <SearchBar searchBarCb={searchBarCb}/>
      <p style={{float: 'left', marginTop: '48px'}}>Founded <strong>{launchesTotal}</strong> launches:</p>
      <TableLaunches  dates={dates} 
                      totalLaunchesCb = {totalLaunchesCb} />
    </div>
  );
}

export default App;

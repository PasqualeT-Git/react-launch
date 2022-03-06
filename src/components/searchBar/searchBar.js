import React, {useEffect, useState} from "react";
import './searchBar.css'

export const SearchBar = () => {
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Retrieve the provided dates
    const start = e.target.querySelector('[name=start]').value
    const end = e.target.querySelector('[name=end]').value   
    
    // Convert the dates in ISOS datetime format
    const isosStart = new Date(start).toISOString()
    const isosEnd = new Date(end).toISOString()

    // Set the datetimes as new states
    setStartDate(isosStart)
    setEndDate(isosEnd)
  }

  useEffect(() => {
    console.log(startDate, endDate)
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input  type="date" 
                placeholder="start date"
                name='start'/>

        <input  type="date" 
                placeholder="end date"
                name='end'/>

        <button>Submit</button>
      </form>   
    </>
  )
}
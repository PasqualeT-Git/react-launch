import React from "react";
import './searchBar.css'

export const SearchBar = ({ searchBarCb }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Retrieve the provided dates
    const start = e.target.querySelector('[name=start]').value
    const end = e.target.querySelector('[name=end]').value   
    
    // Convert the dates in ISOS datetime format
    const isosStart = new Date(start).toISOString()
    const isosEnd = new Date(end).toISOString()

    // Call the callback function from props to set state in App
    searchBarCb({ 'start': isosStart, 'end': isosEnd })
  }

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
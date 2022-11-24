import React from "react"
import './filter.css'

const Filter = ({ filter, handleFilter }) => {
    return (
        <div className="filter_container">
            <h3>Filter shown with:</h3>
            <input value={filter} onChange={handleFilter} className="input" />
        </div>
    )
}

export default Filter;
import React from "react"

const Filter = ({ filter, handleFilter }) => {
    return (
        <div>
            Countries filter:  <input value={filter} onChange={handleFilter} />
        </div>
    )
}

export default Filter;
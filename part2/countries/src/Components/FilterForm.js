import React from "react"

const FilterForm=({filter,handleFilter})=>{
    return(
        <form>
            <div>
                Find countries: <input value={filter} onChange={handleFilter}/>
            </div>
        </form>
    )
  }

  export default FilterForm;
  
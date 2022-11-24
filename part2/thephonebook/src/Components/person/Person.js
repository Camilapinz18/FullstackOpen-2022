import React from "react"

const Person = ({ id, name, number, deletePerson }) => {

  return (
    <li className="person_container">
      <div className="person_details">
        <h4>{name}:</h4>
        <h5>{number}</h5>
        <button onClick={() => deletePerson(id, name)} className="btn btn_ delete">Delete</button>
      </div>

    </li>
  )
}


export default Person;

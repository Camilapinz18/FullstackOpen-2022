import React from "react"

const Person = ({ id, name, number, deletePerson }) => {

  return (
    <li>
      {name}: {number}
      <button onClick={() => deletePerson(id, name)}>Delete</button>
    </li>
  )
}


export default Person;

import React from "react"
import server from "../Services/server"

const Person = ({ id, name, number, deletePerson }) => {

  return (
    <li>
      {name}: {number}
      <button onClick={() => deletePerson(id, name)}>Delete</button>
    </li>
  )
}


export default Person;

import React from "react"
import Person from './person/Person'
const Persons = ({ persons, deletePerson}) => {
  return (
    <div>
      {persons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.phone} deletePerson={deletePerson}/>)}
    </div>
  )
}

export default Persons;

import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import server from "./Services/server";
import './index.css'
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log("effect")
    server
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log(initialPersons)

      })
  }, [])

  console.log("Persons: ", persons.length)

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log('Number: ', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const search = event.target.value.toUpperCase()
    setFilter(search)
    console.log("search: ", search)
    search ? setPersonsToShow(persons.filter((person) => person.name.charAt(0) === search.charAt(0))) : setPersonsToShow(persons)
    search ? setShowAll(false) : setShowAll(true)
  }

  let nameObject = {
    name: newName.toUpperCase(),
    number: newNumber
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clickd', event.target)

    let duplicatedPerson = {
      id: '',
      name: '',
      number: ''
    }

    //El nombre debe compararse con los nombres ya almacenados en persons:
    //Recorre persons, y convierte cada valor en un JSON y lo compara con el newName convertido a JSON tambien
    duplicatedPerson = persons.find(person => (JSON.stringify(person.name) === JSON.stringify(nameObject.name)))

    const changedPerson = { ...duplicatedPerson, number: newNumber }
    console.log(changedPerson.id)
    duplicatedPerson ?

      duplicatedPerson.number === newNumber ?
        alert(`${newName} is already added to phonebook`)
        :
        window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`) ?
          server
            .update(changedPerson.id, changedPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== duplicatedPerson.id ? person : updatedPerson))
              setNewName('');
              setNewNumber('');
              setMessage(`${newName} number has changed`.toUpperCase())
              console.log("Message:", message)
              setTimeout(() => { setMessage(null) }, 3000)
              console.log("Message:", message)
            })
          :
          console.log("remains equal")
      :
      server
        .create(nameObject)
        .then(returnedPerson => {
          setPersons((persons.concat(returnedPerson)))
          setMessage(`${newName} created`.toUpperCase())
          console.log("Message:", message)
          setTimeout(() => { setMessage(null) }, 3000)
          console.log("Message:", message)
          setNewName('');
          setNewNumber('');
        })
  }

  const deletePerson = (id, name) => {
    window.confirm(`Delete ${name}?`) ?
      server
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        }
        )
      :
      console.log(persons)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}></PersonForm>
      <h3>Numbers</h3>
      {showAll ? <Persons persons={persons} deletePerson={deletePerson} message={message} /> : <Persons persons={personsToShow} />}
    </div>
  )
}

export default App
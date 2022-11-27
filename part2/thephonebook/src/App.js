import { useState, useEffect } from "react";
import Filter from "./Components/Filter/Filter";
import PersonForm from './Components/personForm/PersonForm'
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
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    console.log("effect")
    server
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  useEffect(() => {
    server
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    const timer = setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [infoMessage]);

    //console.log("Persons: ", persons.length)

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('Number: ', event.target.value)
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
 
    let duplicatedPerson = {
      id: '',
      name: '',
      number: ''
    }

     //El nombre debe compararse con los nombres ya almacenados en persons:
    //Recorre persons, y convierte cada valor en un JSON y lo compara con el newName convertido a JSON tambien
    duplicatedPerson = persons.find(person => (JSON.stringify(person.name) === JSON.stringify(nameObject.name)))

    const changedPerson = { ...duplicatedPerson, phone: newNumber }
    //console.log(changedPerson.id)
    duplicatedPerson ?

      duplicatedPerson.phone === newNumber ?
        alert(`${newName} is already added to phonebook`)
        ://Modify number:
        window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`) ?
             //Update person:
          server
            .update(changedPerson.id, changedPerson)
            .then(updatedPerson => {
              const updatedPersons=persons.map(person => person.id !== duplicatedPerson.id ? person : updatedPerson)
              setPersons(updatedPersons)
              setNewName('');
              setNewNumber('');
              setInfoMessage({
                message: `${newName} number has changed`.toUpperCase(),
                id: "successful"
              })
              console.log("Message:", infoMessage)
              setTimeout(() => { setInfoMessage(null) }, 3000)
              console.log("Message:", infoMessage)
            })
            .catch(error => {
              setInfoMessage({
                message: error.response.data.error,
                id: "unsuccessful"
              })
              
            })
          :
          console.log("remains equal")
      ://Add new person:*/
      server
        .create(nameObject)
        .then(returnedPerson => {
          setPersons((persons.concat(returnedPerson)))
          setInfoMessage({
            message: `${newName} created`.toUpperCase(),
            id: "successful"
          })         
          setNewName('');
          setNewNumber('');
        })
        .catch(error=>{
          setInfoMessage(
            {
              message: error.response.data.error,
              id: "unsuccessful"
            }
          )
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
    <div className="phonebook_container">
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}></PersonForm>
      <Notification message={infoMessage}/>
      <h2>Numbers</h2>
      {showAll ? <Persons persons={persons} deletePerson={deletePerson} message={infoMessage} /> : <Persons persons={personsToShow} />}
    </div>
  )
}

export default App
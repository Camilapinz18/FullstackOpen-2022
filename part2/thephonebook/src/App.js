import axios from "axios";
import { useState, useEffect} from "react";
import Filter from "./Components/Filter";
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    console.log("effect")
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      console.log("promise fullfilled")
      setPersons(response.data)
    })
  },[])

  console.log("Persons: ",persons.length)



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

  const nameObject = {
    name: newName.toUpperCase(),
    number: newNumber
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clickd', event.target)

    let duplicated = {
      name: ''
    }

    //El nombre debe compararse con los nombres ya almacenados en persons:
    //Recorre persons, y convierte cada valor en un JSON y lo compara con el newName convertido a JSON tambien
    duplicated = persons.find(person => (JSON.stringify(person.name) === JSON.stringify(nameObject.name)))
    duplicated ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObject))
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}></PersonForm>
      <h3>Numbers</h3>
      {showAll ? <Persons persons={persons} /> : <Persons persons={personsToShow} />}
    </div>
  )
}

export default App
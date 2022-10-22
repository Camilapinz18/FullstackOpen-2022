import { useState } from "react";
import Name from './Components/Name'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456'},
  { name: 'Ada Lovelace', number: '39-44-5323523'},
  { name: 'Dan Abramov', number: '12-43-234345'},
  { name: 'Mary Poppendieck', number: '39-23-6423122'}
])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showSearch, setShowSearch]=useState(true)

  

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('Number: ',event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    console.log('Search: ',event.target.value.toUpperCase())
    setNewSearch(event.target.value.toUpperCase())


    const result=persons.filter(person=>JSON.stringify(person.name.charAt(0))===JSON.stringify(newSearch.charAt(0)))
    console.log('result: ',result)

    result? setShowSearch(true):setShowSearch(false)
    console.log("Show search: ",showSearch)

    const namesToShow=showSearch? persons:result

  }

 

  const addName = (event) => {
    event.preventDefault()
    console.log('button clickd', event.target)

    const nameObject = {
      name: newName.toUpperCase(),
      number: newNumber
    }

    let duplicated = {
      name: ''
    }

    //El nombre debe compararse con los nombres ya almacenados en persons:
    //Recorre persons, y convierte cada valor en un JSON y lo compara con el newName convertido a JSON tambien

    duplicated = persons.find(person => (JSON.stringify(person.name) === JSON.stringify(nameObject.name)))
    console.log('Duplicated:', duplicated)
    console.log('nameObject: ', JSON.stringify(nameObject))

    duplicated ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObject))
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input value={newSearch} onChange={(handleNewSearch)}/>
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addName}>
        <div>
          name:<input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:<input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>

        {persons.map(person => <Name key={person.name} name={person.name} number={person.number}/>)}
      </ul>
    </div>
  )
}

export default App
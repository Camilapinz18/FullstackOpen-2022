import { useState } from "react";
import Name from './Components/Name'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Pekka Olkkonen' }])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('button clickd', event.target)

    const nameObject = {
      name: newName
    }

    const checkName = () => {
      persons.map(person => (JSON.stringify(person.name) === JSON.stringify(newName)) ? : setPersons(persons.concat(nameObject)))
      console.log("Not added")
    }


    checkName()
    setNewName('')



  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:<input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Name key={person.name} name={person.name} />)}
      </ul>
    </div>
  )
}

export default App
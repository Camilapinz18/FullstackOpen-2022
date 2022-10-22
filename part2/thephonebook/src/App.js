import { useState } from "react";
import Name from './Components/Name'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'PEKKA OLKKONEN' }])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('button clickd', event.target)

    const nameObject = {
      name: newName.toUpperCase()
    }

    let duplicated = {
      name: ''
    }

    //El nombre debe compararse con los nombres ya almacenados en persons:
    //Recorre persons, y convierte cada valor en un JSON y lo compara con el newName convertido a JSON tambien

    duplicated = persons.find(person => (JSON.stringify(person) === JSON.stringify(nameObject)))
    console.log('Duplicated:', duplicated)
    console.log('nameObject: ', JSON.stringify(nameObject))

    duplicated ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObject))
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
import React from "react"
import './personform.css'

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {

    return (
        <form onSubmit={addPerson} className="form_container">
            <div>
                <h3>Name:</h3>
                <input value={newName} onChange={handleNameChange} className="input"/>
            </div>
            <div>
            <h3>Number:</h3>
                <input value={newNumber} onChange={handleNumberChange} className="input"/>
            </div>
            <div>
                <button type="submit" className="btn btn_add">Add</button>
            </div>
        </form>
    )
}

export default PersonForm

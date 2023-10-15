import { useState } from 'react'

const Person = ({person}) => {
 return (
   <div> {person.name} {person.number} </div>
 )
}

const Persons = ({persons}) => {
 return (
   persons.map(person => <Person person={person} key={person.name}/>)
 )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '055123884'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChanged = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name == newName)) {
      window.alert(`A person with name ${newName} already exists!`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input
            value={newName}
            onChange={handleNewNameChange}
          />
        </div>
        <div>number: <input
          value={newNumber}
          onChange={handleNumberChanged}
        />
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default App

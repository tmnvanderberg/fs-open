import { useState } from 'react'

const Person = ({person}) => {
 return (
   <div> {person.name} </div>
 )
}

const Persons = ({persons}) => {
 return (
   persons.map(person => <Person person={person} key={person.name}/>)
 )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPersons([...persons, { name: newName }])
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

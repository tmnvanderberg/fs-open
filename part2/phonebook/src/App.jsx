import { useEffect, useState } from 'react'

import Filter from './components/filter'
import PersonForm from './components/personform'

import personsService from './services/persons'

const Person = ({ person, deleteOne }) => {
  return (
    <div>
      {person.name}
      {person.number}
      <button onClick={() => deleteOne(person)}> delete </button>
    </div>
  )
}

const Persons = ({ persons, deleteOne }) => {
  return (
    persons.map(person => <Person person={person} deleteOne={deleteOne} key={person.id} />)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')

  const getPersonsHook = () => {
    personsService
    .getAll()
    .then(persons => setPersons(persons))
  }
  useEffect(getPersonsHook, [])

  const handleFilterChange = (event) => {
    setNewFilterValue(event.target.value)
  }

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
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    personsService
      .create(newPerson)
      .then(person => setPersons([...persons, person]))
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person}`)) {
      personsService
        .deleteOne(person)
        .then(() => setPersons(persons.filter( p => p.id != person.id))
        )
    }
  }

  const shouldDisplay = (person) => {
    return person.name.toLowerCase().includes(filterValue.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={filterValue}
        onChange={handleFilterChange}
      />
      <h2> Add new </h2>
      <PersonForm
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNumberChanged={handleNumberChanged}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter(person => shouldDisplay(person))}
        deleteOne = {deletePerson}
      />
    </div>
  )
}

export default App

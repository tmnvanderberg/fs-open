import { useEffect, useState } from 'react'

import Filter from './components/filter'
import PersonForm from './components/personform'

import personsService from './services/persons'

const Person = ({ person, deleteOne }) => {
  return (
    <div>
      <div> {person.name} </div>
      <div> {person.number} </div>
      <button onClick={() => deleteOne(person)}> delete </button>
    </div>
  )
}

const Persons = ({ persons, deleteOne }) => {
  return (
    persons.map(person => <Person person={person} deleteOne={deleteOne} key={person.id} />)
  )
}

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClass, setNotificationClass] = useState('notification')

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

  const setNotification = (message, className) => {
    setNotificationClass(className)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const createPerson = () => {
    const newPerson = { name: newName, number: newNumber }
    personsService
      .create(newPerson)
      .then((person) => {
        setPersons([...persons, person])
        setNotification(`Added ${newPerson.name}`, 'notification')
      })
  }

  const updatePerson = (person) => {
    personsService
      .update({ name: person.name, number: newNumber, id: person.id })
      .then((person) => {
        setPersons(
          persons.map(
            p => p.id == person.id ? person : p
          )
        )
        setNotification(`updated ${person.name}`, 'notification')
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name == newName)
    if (!person) {
      createPerson()
      return
    }
    if (window.confirm(`${newName} already exists, replace the number?`)) {
      updatePerson(person)
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deleteOne(person)
        .then(() => setPersons(persons.filter(p => p.id != person.id))
        )
        .catch(error => {
          setNotification(`Failed to delete ${person.name}`, 'error')
        })
    }
  }

  const shouldDisplay = (person) => {
    return person.name.toLowerCase().includes(filterValue.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} className={notificationClass} />
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
        deleteOne={deletePerson}
      />
    </div>
  )
}

export default App

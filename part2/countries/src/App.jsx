import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countries'
import Filter from './components/filter'

const Country = ({ country }) => {
  console.log(country)
  return (
    <div>
      <h1> {country.name.common} </h1>
      <div> capital {country.capital} </div>
      <div> area {country.area} </div>
      <h2> languages: </h2>
      <ul>
        { Object
          .keys(country.languages)
          .map(langKey => <li key={langKey}> { country.languages[langKey] } </li>) }
      </ul>
      <div>
        <img src={country.flags.png} alt="flag"/>
      </div>
    </div>
  )
}

const Countries = ({ countries }) => {
  const num = countries.length

  if (num > 10) {
    return (
      <div> "too many" </div>
    )
  }

  if (num == 1) {
    return (
      <Country country={countries[0]}/>
    )
  }

  if (countries.length <= 10) {
    return (
      <div>
        {
          countries.map(country =>
            <Country
              country={country}
              key={country.name.official}
            />
          )
        }
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState("")
  const [shownCountries, setShownCountries] = useState([])

  const getCountriesHook = () => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  }
  useEffect(getCountriesHook, [])

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    const matching = countries.filter(country => shouldDisplay(country))
    setShownCountries(matching)
  }

  const shouldDisplay = (country) => {
    return (
      country.name.common.toLowerCase().includes(filterValue.toLowerCase())
    )
  }

  return (
    <div>
      <Filter
        value={filterValue}
        onChange={handleFilterChange}
      />
      <Countries countries={shownCountries} />
    </div>
  )

}

export default App
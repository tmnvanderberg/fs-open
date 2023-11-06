import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countries'
import weatherService from './services/weather'
import Filter from './components/filter'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const getWeatherHook = () => {
    weatherService
      .getCurrent(country.name.common)
      .then(respData => {
        setWeather(respData)
        console.log(respData)
      })
  }
  useEffect(getWeatherHook, [])

  return (
    <div>
      <h1> {country.name.common} </h1>
      <div> capital {country.capital} </div>
      <div> area {country.area} </div>
      <h2> languages: </h2>
      <ul>
        {Object
          .keys(country.languages)
          .map(langKey => <li key={langKey}> {country.languages[langKey]} </li>)}
      </ul>
      <div>
        <img src={country.flags.png} alt="flag" />
      </div>
      <div>
        <h1> Weather in {country.name.common} </h1>
        <div>
          Temperature: {weather ? weather.current.temperature : null} °Celcius
        </div>
        <div>
          <img src={weather ? weather.current.weather_icons[0] : null} />
        </div>
        <div>
          wind: {weather ? weather.current.wind_speed : null} m/s
        </div>
      </div>
    </div>
  )
}

const CountryItem = ({ country, handleShow }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => handleShow(country)}> show </button>
    </div>
  )
}

const Countries = ({ countries, handleShow }) => {
  const num = countries.length

  if (num > 10) {
    return (
      <div> "too many" </div>
    )
  }

  if (num == 1) {
    return (
      <Country country={countries[0]} />
    )
  }

  if (countries.length <= 10) {
    return (
      <div>
        {
          countries.map(country =>
            <CountryItem
              country={country}
              key={country.name.official}
              handleShow={handleShow}
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

  const handleShow = (country) => {
    setShownCountries([country])
  }

  return (
    <div>
      <Filter
        value={filterValue}
        onChange={handleFilterChange}
      />
      <Countries
        countries={shownCountries}
        handleShow={handleShow}
      />
    </div>
  )

}

export default App

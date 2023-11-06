
import axios from 'axios'
const baseUrl = 'http://api.weatherstack.com/current'
const apiKey = import.meta.env.VITE_WEATHERSTACK_API_KEY

const getCurrent = (location) => {
  const request = axios.get(baseUrl + '?access_key=' + apiKey + '&query=' + location)
  return request.then(response => response.data)
}

export default {
  getCurrent,
}

import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    request = axios.get(baseUrl)
    console.log(`request:${request}`)
    return request.then(response => response.data)
}

const create = newObject => {
    request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}

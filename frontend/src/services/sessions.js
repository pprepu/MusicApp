import axios from 'axios'
const sessionUrl = '/api/sessions'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async newSession => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(sessionUrl, newSession, config)
    return res.data
}

export default {
    setToken,
    create
}
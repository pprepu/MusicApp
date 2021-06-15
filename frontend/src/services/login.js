import axios from 'axios'
const loginUrl = '/api/login'

const login = async credentials => {
    const res = await axios.post(loginUrl, credentials)
    return res.data
}

export default { login }
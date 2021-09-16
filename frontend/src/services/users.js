import axios from 'axios'
const userUrl = '/api/users'

const getUser = async id => {
    const res = await axios.get(`${userUrl}/${id}`)
    return res.data
}

const createUser = async user => {
    const res = await axios.post(userUrl, user)
    return res
}

export default {
    getUser,
    createUser
}
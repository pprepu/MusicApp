import axios from 'axios'
const userUrl = '/api/users'

const getUser = async id => {
    const res = await axios.get(`${userUrl}/${id}`)
    return res.data
}

export default {
    getUser
}
require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
const LOCAL_MONGODB_URI = 'mongodb://localhost:27017/musicApp_test'

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = LOCAL_MONGODB_URI
} else if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.DEV_MONGODB_URI
}

const PORT = process.env.PORT || 3001

module.exports = {
  MONGODB_URI, PORT
}
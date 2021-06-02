const mongoose = require('mongoose')

const newId = new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca')
const newIdRandom = new mongoose.mongo.ObjectId()

console.log('newId:', newId)
console.log('randomId', newIdRandom)
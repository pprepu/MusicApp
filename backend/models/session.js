const mongoose = require('mongoose')

var historyItemSchema = mongoose.Schema({
  answer: String, 
  correctAnswer: String 
}, { _id : false })

const sessionSchema = mongoose.Schema({
  sessionType: String,
  answersCorrect: Number,
  answersWrong: Number,
  sessionHistory: [ historyItemSchema ],
  date: { 
    type: Date, 
    default: Date.now 
  },
})


sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to MongoDB...')

mongoose
  .connect(url)
  .then(resullt => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const numberValidation =
{
  validator: (num) => {
    if (num[2] !== '-') {
      if (num[3] !== '-') {
        return false
      }
    }
    return true

  },
  msg: 'Incorrect number format'
}

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    phone: {
      type: String,
      minLength: 8,
      validate: numberValidation
    }
  })

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)

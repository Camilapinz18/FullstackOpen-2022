const mongoose=require('mongoose')
require('dotenv').config()
const url=process.env.MONGODB_URI

console.log("connecting to MongoDB...")

mongoose
.connect(url)
.then(resullt=>{
    console.log('Connected to MongoDB')
})
.catch((error)=>{
    console.log('Error connecting to MongoDB:',error.message)
})

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
     
      
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Contact', contactSchema)
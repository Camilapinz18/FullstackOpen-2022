/* eslint-disable no-undef */
const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@fso2022.2bqdt3g.mongodb.net/phonebook?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length > 3) { //Si es mayor a 3, guarda el nombre
  mongoose
    .connect(url)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      console.log('connected')
      const nameArg = process.argv[3]
      const phoneArg = process.argv[4]
      //console.log("namearg", nameArg)
      //console.log("phonearg", phoneArg)

      const contact = new Contact({
        name: nameArg,
        phone: phoneArg,
      })
      console.log('Added', nameArg, phoneArg, 'to phonebook')
      return contact.save()

    }).then(() => {
      return mongoose.connection.close()
    }).catch((err) => console.log(err))

} else if (process.argv.length === 3) {

  mongoose
    .connect(url)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      Contact.find({})
        .then(result => {
          result.forEach(person => {
            console.log(person)
            return mongoose.connection.close()
          })
        })
    }).catch((err) => console.log(err))
}
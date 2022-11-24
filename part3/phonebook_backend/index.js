const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
require('dotenv').config()

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const Contact = require('./models/contact')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


/************************************************************************************************** */
app.get('/info', (request, response) => {
  Contact.find({})
    .then(contact => {
      response.send(
        `<div>
        <p>Phonebook has info for ${contact.length} people</p>
        <p>${new Date()}</p>
      </div>`)
    })
})

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contact) => {
    morgan(':method :url :status :res[content-length] - :response-time ms');
    response.json(contact);
  });
});
  
app.get('/api/persons/:id', (request, response) => {
  Contact.findById(request.params.id).then(contact=>{
    if (contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
  })
})

app.post('/api/persons/', (request, response) => {
  const data=request.body
  console.log("req:",data)

  const contact = new Contact(
    {
      name: data.name,
      phone: data.number,
    }
  )

  if (data === undefined) {
    return response.status(400).json({ error: 'content missing' })
  } else{
    contact.save().then(savedContact => {
      response.json(savedContact)
    })
  }
})

app.delete('/api/persons/:id', (request, response) => {

  /*Contact.findById(request.params.id).then(contact=>{

  })*/
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})




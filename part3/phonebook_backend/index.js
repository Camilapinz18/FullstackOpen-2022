const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
require('dotenv').config()

// eslint-disable-next-line no-undef
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

app.get('/api/persons', (request, response) => {
  Contact.find({}).then((contact) => {
    morgan(':method :url :status :res[content-length] - :response-time ms')
    response.json(contact)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Contact.findById(request.params.id).then(contact => {
    if (contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
  })
})

app.post('/api/persons/', (request, response, next) => {
  const data = request.body
  console.log('req:', data)

  const contact = new Contact(
    {
      name: data.name,
      phone: data.number,
    }
  )

  contact.save().then(savedContact => {

    response.json(savedContact)
  }).catch(error => next(error))
}
)

app.put('/api/persons/:id', (request, response, next) => {
  const newNumber = request.body.phone
  console.log('newNUmber:', newNumber)

  const newUpdate = {
    name: request.body.name,
    phone: newNumber
  }

  Contact.findByIdAndUpdate(request.params.id, newUpdate, { runValidators: true })
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'Cast error') {
    return res.status(400).send({ error: 'malformated id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)









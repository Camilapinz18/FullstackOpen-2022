const express = require('express')
const app = express()

let persons =
  [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    },
    {
      "id": 5,
      "name": "Henry Olkkonen",
      "number": "39-25-3546987"
    }
  ]

app.get('/info', (request, response) => {
  const info = persons.length
  const date = new Date()
  console.log(info)
  response.send(
    `<div>
      <p>Phonebook has info for ${info} people</p>
      <p>${date}</p>
    </div>`)

})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.use(express.json())

const generateId = () => {
  min = 0
  max = 500
  return Math.floor(Math.random() * (max - min) + min);
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  if (!person.name || !person.number)  {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const name=persons.find(name=> name.name === person.name)
  if(name){
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
}
)

const PORT = 3001
app.listen(PORT)
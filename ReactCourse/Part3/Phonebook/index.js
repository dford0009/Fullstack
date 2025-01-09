const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

//app.use((req, res, next) => {
//  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//  next();
//});

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info',(request, response) => {
  const numberOfPersons = persons.length; // Calculate the number of people in the array
  const currentDate = new Date(); // Get the current date and time

  response.send(`
    <p> Phonebook has info for ${numberOfPersons} people.</p>
    <p>${currentDate} </p>
    `)
})

app.get('/api/persons',(request, response) => {
  response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const range = 1000000000
  const maxId = Math.floor(Math.random()*range)+1
  return String(maxId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const personExists = persons.some(person => person.name === body.name)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Name or phone number missing' 
    })
  }

  if (personExists) {
    return response.status(400).json({ 
      error: 'Name already exists' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})



const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});
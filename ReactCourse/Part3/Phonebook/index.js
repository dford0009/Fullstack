require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')

const app = express()

app.use(express.static('dist'))


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.error(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(cors())
app.use(express.json())
app.use(requestLogger)

//app.use((req, res, next) => {
//  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//  next();
//});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

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

//let persons = [
//  {
//    "id": '1',
//    "name": 'Arto Hellas',
//    "number": '040-123456'
//  },
//  {
//    "id": '2',
//    "name": 'Ada Lovelace',
//    "number": '39-44-5323523'
//  },
//  {
//    "id": '3',
//    "name": 'Dan Abramov',
//    "number": '12-43-234345'
//  },
//  {
//    "id": '4',
//    "name": 'Mary Poppendieck',
//    "number": '39-23-6423122'
//  }
//]

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      const numberOfPersons = persons.length // Calculate the number of people in the array
      const currentDate = new Date() // Get the current date and time

      response.send(`
        <p> Phonebook has info for ${numberOfPersons} people.</p>
        <p>${currentDate} </p>
      `)
    })
    .catch(error => next(error))
    //{
    //response.status(500).json({ error: 'Failed to fetch persons' })
    //})
})

app.get('/api/persons',(request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
    //{
    //response.status(500).json({ error: 'Failed to fetch persons' })
    //})
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  //const person = persons.find(person => person.id === id)
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//const generateId = () => {
//  const range = 1000000000
//  const maxId = Math.floor(Math.random()*range)+1
//  return String(maxId)
//}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  //THIS CONSTRAINT IS NOW HANDLED BY MONGOOSE IN THE PERSON SCHEMA
  //if (!body.name || !body.number) {
  //  return response.status(400).json({
  //    error: 'Name or phone number missing'
  //  })
  //}

  Person.findOne({ name: body.name }).then(personExists => {
    if (personExists) {
      return response.status(400).json({
        error: 'Name already exists'
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))
    //.catch(error => {
    //  response.status(500).json({ error: 'Failed to save person' })
    //})
  })
  //{
  //response.status(500).json({ error: 'Failed to check if person exists' })
  //})
})

//Mongoose update person
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  //persons = persons.filter(person => person.id !== id)

  Person.findOneAndDelete({ _id: id }).then(() => {
    response.status(204).end()
  }).catch(error => next(error))

  //response.status(204).end()
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`)
})
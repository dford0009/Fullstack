require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
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


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//let notes = [
//  {
//    id: "1",
//    content: "HTML is easy",
//    important: true
//  },
//  {
//    id: "2",
//    content: "Browser can execute only JavaScript",
//    important: false
//  },
//  {
//    id: "3",
//    content: "GET and POST are the most important methods of HTTP protocol",
//    important: true
//  }
//]

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})


//app.get('/',(request, response) => {
//  response.send('<h1> Hello World! </h1>')
//})

//Notes array
//app.get('/api/notes',(request, response) => {
//  response.send(notes)
//})

//Mongoose
app.get('/api/notes', (request, response, next) => {
  Note.find({}).then(notes => {
    response.json(notes)
  }).catch(error => next(error))
})

//Notes array
//app.get('/api/notes/:id', (request, response) => {
//  const id = request.params.id
//  const note = notes.find(note => note.id === id)
//  if (note) {
//    response.json(note)
//  } else {
//    response.status(404).end()
//  }
//})

//Mongoose
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
  //.catch(error => {
  //  console.log(error)
  //  response.status(400).send({ error: 'malformatted id' })
  //})
})

//Mongoose update note
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new:true, runValidators:true, context:'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

//Used for Notes array to generate ID
//const generateId = () => {
//  const maxId = notes.length > 0
//    ? Math.max(...notes.map(n => Number(n.id)))
//    : 0
//  return String(maxId + 1)
//}

//Notes Array
//app.post('/api/notes', (request, response) => {
//  const body = request.body
//
//  if (!body.content) {
//    return response.status(400).json({
//      error: 'content missing'
//    })
//  }
//
//  const note = {
//    content: body.content,
//    important: Boolean(body.important) || false,
//    id: generateId(),
//  }
//
//  notes = notes.concat(note)
//
//  response.json(note)
//})

//Mongoose
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  //THIS CONSTRAINT IS NOW HANDLED BY MONGOOSE IN THE NOTE SCHEMA
  //if (body.content === undefined) {
  //  return response.status(400).json({ error: 'content missing' })
  //}

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

//Notes array
//app.delete('/api/notes/:id', (request, response) => {
//  const id = request.params.id
//  notes = notes.filter(note => note.id !== id)
//
//  response.status(204).end()
//})

//Mongoose
app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  //persons = persons.filter(person => person.id !== id)

  Note.findOneAndDelete({ _id: id }).then(() => {
    response.status(204).end()
  }).catch (error => next(error))

  //response.status(204).end()
})


app.use(unknownEndpoint)



// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

//const app = http.createServer((request, response) => {
//  response.writeHead(200, { 'Content-Type': 'application/json' })
//  response.end(JSON.stringify(notes))
//})

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`)
})



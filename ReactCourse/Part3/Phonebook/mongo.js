const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]
const range = 1000000000
const newId = Math.floor(Math.random()*range)+1

const url =
  `mongodb+srv://dford:${password}@cluster0.50s22.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber,
  id: newId
})

if (process.argv.length > 3) {
    person.save().then(result => {
        console.log(`${person.name} number ${person.number} added to Phonebook!`)
        mongoose.connection.close()
    })
}else {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
          mongoose.connection.close()
        })
    })
}


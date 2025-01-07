import { useState, useEffect } from 'react';
import axios from 'axios'
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personsService from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = type === 'success' ? 'notification success' : 'notification error';

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    //{
    //  name: 'Arto Hellas',
    //  phone: '123-456-7890',
    //},
  ]);
  const [errorMessage, setErrorMessage] = useState({message: null, type: null})

  

  useEffect(() => {
    console.log('effect')
    personsService.getAll().then(getPersons => {
      setPersons(getPersons);
    })
    .catch((error) => {
      // Handle error appropriately
      console.error('Failed to fetch persons:', error);
    });
  }, [])
  
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log('name added', event.target);

    const personObject = { name: newName, number: newPhone };

    const nameExists = persons.find((person) => person.name === newName);

    console.log(nameExists);

    if (nameExists) {
      
      if (window.confirm(`Update ${newName}'s phone number?`)) {
        const changedPhone = { ...nameExists, number: newPhone };

        personsService.update(nameExists.id, changedPhone).then(returnedPerson => {
        setPersons(persons.map((person) => (person.id === nameExists.id ? returnedPerson : person)));
        setNewName('');
        setNewPhone('');
        
        setErrorMessage({
          message: `Person '${nameExists.name}'s phone number has been updated to '${changedPhone.number}'`,
          type: 'success'
        })
        setTimeout(() => {
          setErrorMessage({message:null,type:null})
        }, 5000)
        })
        .catch((error) => {
          //alert(`Failed to update ${newName}. ${error.response.data.error}`);
        });
      }
    } else {

      personsService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhone('');

        setErrorMessage({
          message: `'${personObject.name} has been added to the phonebook.`,
          type: 'success'
        })
        setTimeout(() => {
          setErrorMessage({message:null,type:null})
        }, 5000)
        
      });
      
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((n) => n.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id)); // Remove person from state
        })
        .catch((error) => {
          setErrorMessage({
          message: `'${person.name} has already been removed from the phonebook.`,
          type: 'error'
          })
          setTimeout(() => {
            setErrorMessage({message:null,type:null})
          }, 5000)
          //alert(`The person '${person.name}' was already deleted from the server`);
          setPersons(persons.filter((p) => p.id !== id)); // Remove from UI
        });
    }

    console.log(`${id} needs to be deleted`);
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.message} type={errorMessage.type}/>
      <Filter filter={filter} onChange={handleFilterChange} />
      {/*<div>
        Filter shown names:{' '}
        <input value={filter} onChange={handleFilterChange} />
      </div>*/}
      <h2> Add a new </h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      {/*<form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>*/}
      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow}
        deletePerson = {(id) => deletePerson(id)}
      />
      {/*{personsToShow.map((person, index) => (
          <li key={index}>
          {person.name} - {person.phone}
        </li>
      ))}*/}
    </div>
  );
};

export default App;

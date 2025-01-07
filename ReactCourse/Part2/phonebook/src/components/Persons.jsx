const Persons = ({ persons, deletePerson }) => {
    const label = 'delete'
  
  
    return (
      <div>
        <ul>
          {persons.map((person, index) => (
            <li key={index}>
              {person.name} - {person.number}
              <button onClick={() => deletePerson(person.id)}>{label}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Persons;
  
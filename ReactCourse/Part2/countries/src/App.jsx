import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('API response:', response.data); // Inspect API data structure
        setAllCountries(response.data);
        //setCountries(response.data); // Initialize countries with all countries
      });
  }, [countries]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setNewFilter(value);
  
    // If the filter is empty, reset to all countries
    if (value === '') {
      setCountries(allCountries);
    } else {
      const regex = new RegExp(value, 'i'); // Case-insensitive match
      const filteredCountries = allCountries.filter(
        (country) => country.name.common && country.name.common.match(regex)
      );
      setCountries(filteredCountries);
    }
  };

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Content countries={countries} />
    </div>
  )
}

export default App

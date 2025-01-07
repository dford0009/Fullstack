import React, { useState } from 'react';
import Country from './Country';

const Content = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (countries.length === 0) {
    return <p>No countries found</p>;
  }

  if (countries.length === 1) {
    return <p><Country country={countries[0]} showDetails /></p>;
  }

  if (countries.length >= 10) {
    return <p>Too many results, please narrow your search</p>;
  }

  const handleShowDetails = (countryCode) => {
    // Toggle selected country or collapse if the same country is clicked
    setSelectedCountry((prevSelected) =>
      prevSelected === countryCode ? null : countryCode
    );
  };

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          <Country
            country={country}
            showDetails={selectedCountry === country.cca3}
          />
          <button onClick={() => handleShowDetails(country.cca3)}>
            {selectedCountry === country.cca3 ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Content;

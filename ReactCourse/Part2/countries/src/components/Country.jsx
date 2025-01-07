import React,{useState, useEffect} from 'react';

const Country = ({ country, showDetails, showWeather }) => {
  const [weather, setWeather] = useState([])

  //useEffect(() => {
  //const params = {
  //  access_key: process.env.REACT_APP_API_KEY,
  //  query: country.capital
  //}

  //axios.get('http://api.weatherstack.com/current', {params})
  //  .then(response => {
  //    const apiResponse = response.data;
  //    console.log(apiResponse)
  //    console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
  //    setWeather([apiResponse])
  //  }).catch(error => {
  //    console.log(error);
  //})
  //

  return (
    <div>
      <h1>{country.name.common}</h1>
      {showDetails && (
        <>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h2>Spoken languages</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="200"
          />
        </>
      )}
      {showWeather && (
        <>
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {currentWeather.temperature}° Celcius</p>
        <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
        <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
        </>
      )}
    </div>
  );
};

export default Country;

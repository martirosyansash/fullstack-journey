


import { useState } from 'react'
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import './App.css'




function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  
  
  async function fetchWeather(cityName) {
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      
      const data = await response.json();
      setWeather(data);
      console.log(data, response);
      
    } catch(error) {
      setError(error.message)
      setWeather(null)
    } finally { 
      setLoading(false);
    }
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.trim() === "") { return }
    setSearchedCity(city.trim());

    fetchWeather(city.trim());
  }
  return (
    <div className='app'> 
      <SearchForm
        city={city}
        setCity={setCity}
        handleSubmit={handleSubmit}
        loading={ loading}
      />
      {searchedCity && (<p>Searching weather for: {searchedCity}</p>)}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && <WeatherCard weather = {weather} />}
    </div>
  );
}
export default App

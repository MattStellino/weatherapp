import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import SearchBar from "./SearchBar";
import WeatherDisplay from "./WeatherDisplay";
import WeatherDetails from "./WeatherDetails";
import HourlyForecast from "./HourlyForecast";
import Error from "./Error";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

const Weather = () => {
  // State Variables
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("London");
  const [inputValue, setInputValue] = useState("");
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [error, setError] = useState("");

  // fetchData function takes a query and fetches weather data based on that query
const fetchData = (query) => {
  // If the query is empty, set an error message and clear previous data
  if (!query) {
    setError("Please enter a location");
    setWeatherData(null);
    setHourlyForecast(null);
    return;
  }

  // Fetch data from the weather API using the query
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5649978a16b4488f8df222215230804&q=${query}&days=1&aqi=no&alerts=no`
  )
    .then((res) => res.json())
    .then((data) => {
      // If there's an error in the API response, display the API error message and clear previous data
      if (data.error) {
        setError(data.error.message);
        setWeatherData(null);
        setHourlyForecast(null);
      } else {
        // If no error, clear any previous error messages and set the weather data and hourly forecast
        setError("");
        setWeatherData(data);
        setHourlyForecast(data.forecast.forecastday[0].hour);
      }
    })
    // If there's an error during fetch, display custom error message and clear previous data
    .catch((error) => {
      setError("Failed to fetch weather data. Please try again later.");
      setWeatherData(null);
      setHourlyForecast(null);
    });
};

// Fetch data on component mount using useEffect hook
useEffect(() => {
  fetchData(searchQuery);
}, []);

// handleSearch function updates the search query and fetches new data based on user input
const handleSearch = () => {

  // Clear any previous error messages
  setError("");

  // Update the search query state with the input value
  setSearchQuery(inputValue);

  // Fetch new data based on the updated search query
  fetchData(inputValue);
};

  // Popular locations
  const popularLocations = [
    "London",
    "New York",
    "Paris",
    "Tokyo",
    "Sydney",
    "Los Angeles",
    "Berlin",
  ];

  return (
    <Container
      fluid
      className={`weather-container p-5 ${
        weatherData &&
        weatherData.current &&
        weatherData.current.condition.text
      } ${weatherData &&
        weatherData.current.condition.text
          .toLowerCase()
          .replace(" ", "-")}`}
    >
      <Row>
        {/* Container for displaying the main weather information */}
        <div className="weather-data-container">
          {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </div>
        {/* Container for the search bar and error messages */}
        <div className="search-bar-container">
          <SearchBar
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSearch={handleSearch}
            popularLocations={popularLocations}
          />
          {/* Display error message if there's an error */}
          {error && <Error message={error} />}
        </div>
      </Row>
      <Row>
        {/* Container for additional weather details and hourly forecast */}
        <div className="weather-details-container">
          {weatherData && <WeatherDetails weatherData={weatherData} />}
          {hourlyForecast && (
            <HourlyForecast hourlyForecast={hourlyForecast} />
          )}
        </div>
      </Row>
    </Container>
  );
};

export default Weather;

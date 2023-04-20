import React from "react";
import { Col, Row } from "react-bootstrap";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

// WeatherDisplay component displays the current weather information for a location
const WeatherDisplay = ({ weatherData }) => {

  // Get the timezone of the location
  const timeZone = weatherData.location.tz_id;

  // Convert the current time to the location's timezone and format it
  const formattedLocalTime = format(utcToZonedTime(new Date(), timeZone), "p");

  // Render the weather information if weatherData is available
  return weatherData && (
    <Row>
      <Col>
        <div>
          <h2 className="location">
            {weatherData.location.name}<br/>
            {weatherData.location.country}
          </h2>
          <h3 className="temperature">{weatherData.current.temp_c}°C</h3>
          <p className="current-time">{formattedLocalTime}</p>
          <p className="weather">
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
            {weatherData.current.condition.text}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default WeatherDisplay;

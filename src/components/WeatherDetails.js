import React from "react";
import { Col, Card } from "react-bootstrap";
import Error from "./Error";

// WeatherDetails component displays additional weather details (humidity, feels-like temp, and wind speed)
const WeatherDetails = ({ error, weatherData }) => (
  <Col>
    <Card className="mx-auto text-center ">
      <Card.Body className="justify-content-center mb-1 p-2">
        {/* Display error message if any */}
        {error && <Error message={error} />}
        {/* Check if weatherData.current exists before displaying weather details */}
        {weatherData?.current && (
          <div className="d-flex justify-content-between">
            <p className="m-3">Humidity<br />{weatherData.current.humidity}%</p>
            <p className="m-3">Feels like<br />{weatherData.current.feelslike_c}°C</p>
            <p className="m-3">Wind speed<br />{weatherData.current.wind_kph} km/h</p>
          </div>
        )}
      </Card.Body>
    </Card>
  </Col>
);

export default WeatherDetails;

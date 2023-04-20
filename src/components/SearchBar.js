import React from "react";
import { Col, Form, Button } from "react-bootstrap";

// SearchBar component allows users to search for weather data for a specific location
const SearchBar = ({
  inputValue,
  setInputValue,
  handleSearch,
  popularLocations
}) => {
  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Col md={5}>
      <Form>
        <Form.Group>
          <Form.Control
            className="searchbar"
            type="text"
            placeholder="Enter a location"
            value={inputValue}
            onChange={handleInputChange}
            list="popular-locations"
          />
          {/* Datalist for popular locations */}
          <datalist id="popular-locations">
            {popularLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </datalist>
        </Form.Group>
        <Button variant="primary" onClick={handleSearch} className="search-button w-100 mb-3">
          Search
        </Button>
      </Form>
    </Col>
  );
};

export default SearchBar;

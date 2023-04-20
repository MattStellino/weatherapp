import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// HourlyForecast component displays hourly weather forecast using a carousel
const HourlyForecast = ({ hourlyForecast }) => {
  // Slider settings for the carousel
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Row className="hourly-container pt-3">
      <Col>
        {/* Slider component for the carousel */}
        <Slider {...settings} className='slider'>
          {/* Map through the hourlyForecast data and display each hour's weather */}
          {hourlyForecast.map((hour) => (
            <div key={hour.time_epoch} className="mb-4">
              <div className="icon-container text-center">
                <h5>{hour.time.substring(11, 16)}</h5>
                <img src={hour.condition.icon} alt={hour.condition.text} />
                <p>{hour.condition.text}</p>
                <p>{hour.temp_c} °C</p>
              </div>
            </div>
          ))}
        </Slider>
      </Col>
    </Row>
  );
};

export default HourlyForecast;

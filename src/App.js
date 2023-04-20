import React from "react";
import Weather from "./components/Weather";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Error from './components/Error';

// Render Weather component
function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;

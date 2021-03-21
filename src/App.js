// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Forecast from './components/Forecast';
import WeeklyForecast from './components/WeeklyForecast';


export default function App() {
  return (
    <div className="App">
      <header className="App-header"> 
      <h1>Weather App!</h1>
      </header>
      <main>
      <h2>Find Current Weather Conditions</h2>

        <Forecast />
        <h2>Find Weekly Weather Conditions</h2>
        <WeeklyForecast />
      </main>
      
    </div>
  );
}


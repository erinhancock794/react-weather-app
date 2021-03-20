// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import Forecast from "./components/Forecast";


export default function App() {
  return (
    <div className="App">
      <header className="App-header"> 
      <h1>Weather App!</h1>
      </header>
      <main>
        <Forecast />
      </main>
      
    </div>
  );
}
// export default function App() {
//   const [lat, setLat] = useState([]);
//   const [long, setLong] = useState([]);
//   const [data, setData] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     setLat(position.coords.latitude);
//     setLong(position.coords.longitude);
//   });
//   await fetch(`${process.env.WEATHER_API_URL}/onecall?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}`)
//     .then(res => res.json())
//       .then(
//         (result) => {
//           setData(result);
//           console.log(result);
//         })
//       }
//         fetchData();
//     }, [lat,long])

//   // console.log("Latitude is:", lat)
//   // console.log("Longitude is:", long)

//   return (
//     <div className="App">
      
      
//     </div>
//   );
// }


// export default App;

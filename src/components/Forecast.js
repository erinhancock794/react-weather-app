import React, { useState } from 'react';
import Conditions from './Conditions';
import classes from './Forecast.module.css'
 

const Forecast = () => {
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
    const WEATHER_API_KEY = '880bcb631f870f8a5bd11ec2bd58f4d1';

    // const GEO_API_KEY = 'AIzaSyATBnmFjxXtXzvjiq0TvbsQGlg04FCk_FE'

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);


    function getCurrentWeather(e) { 
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }
        setError(false);
        setResponseObj({});
        setLoading(true);
        const uriEncodedCity = encodeURIComponent(city);
        const url = `${WEATHER_API_URL}/weather?q=${uriEncodedCity}&appid=${WEATHER_API_KEY}&units=${unit}`;



        fetch(url)
        .then( (response) => {
            return response.json()
        })
        .then((response) => {
            console.log('res', response)

            if (response.cod !== 200) {
                throw new Error()
            }

            setResponseObj(response);
            console.log('response obj', responseObj);
            setLoading(false);
        })
        .catch((error) => {
            setError(true);
            setLoading(false);
            console.log(error.message);
        })
    }

    // function getWeeklyForecast(e) { 
    //     e.preventDefault();
    //     if (city.length === 0) {
    //         console.log('city length error');
    //         return setError(true);
    //     }
    //     setError(false);
    //     setResponseObj({});
    //     setLoading(true);

    //     const uriEncodedCity = encodeURIComponent(city);
    //     const url = `${WEATHER_API_URL}/forecast?q=${uriEncodedCity}&cnt=7&appid=${WEATHER_API_KEY}&units=${unit}`;

    //     fetch(url)
    //     .then( (response) => {
    //         console.log('response---', response);
    //         return response.json()
    //     })
    //     .then((response) => {
    //         console.log('res', response)

    //         if (response.cod !== "200") {
    //             console.log('cod is not 200');
    //             throw new Error();
    //         }

    //         setResponseObj(response);
    //         console.log('response obj', responseObj);
    //         setLoading(false);
    //     })
    //     .catch((error) => {
    //         setError(true);
    //         setLoading(false);
    //         console.log(error.message);
    //     })
    // }



    return (
        <div>
           <form onSubmit={getCurrentWeather}>
               <input
               type="text"
               placeholder="Enter city"
               maxLength="50"
               className={classes.TextInput}
               value={city}
               onChange={(e) => setCity(e.target.value)}
               />
               <label className={classes.Radio}>
                   <input
                   type="radio"
                   name="units"
                   checked={unit === "imperial"}
                   value="imperial"
                   onChange={(e) => setUnit(e.target.value)}
                   />
                Fahrenheit
               </label>
               <label className={classes.Radio}
>
                   <input 
                   type="radio"
                   name="units"
                   checked={unit === "metric"}
                   value="metric"
                   onChange={(e) => setUnit(e.target.value)}
                   />
                   Celcius
               </label>
               <button className={classes.Button}
type="submit"> Current Weather</button>
           </form>

           <form onClick={getCurrentWeather}>
            <Conditions 
                responseObj={responseObj}
                error={error}
                loading={loading}
           />
            
        </form>


       </div>
    )
}

export default Forecast;
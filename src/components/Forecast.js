import React, { useState } from 'react';
import Conditions from './Conditions';
import classes from './Forecast.module.css'
 

const Forecast = () => {
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
    const WEATHER_API_KEY = '880bcb631f870f8a5bd11ec2bd58f4d1';

    // const GEO_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyATBnmFjxXtXzvjiq0TvbsQGlg04FCk_FE`;

    const GEO_API_KEY = 'AIzaSyATBnmFjxXtXzvjiq0TvbsQGlg04FCk_FE'



    let [lat, setLat] = useState('');
    let [lon, setLon] = useState('')
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    // const uriEncodedCity = encodeURIComponent(city);
    // const url = `${WEATHER_API_URL}/weather?q=${uriEncodedCity}&appid=${WEATHER_API_KEY}&units=${unit}`;
    async function getCoordinates(e) {
        e.preventDefault();
                if (city.length === 0) {
            return setError(true);
        }
        setError(false);
        setResponseObj({});
        setLoading(true);
        setLat('');
        setLon('');
        const GEO_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyATBnmFjxXtXzvjiq0TvbsQGlg04FCk_FE`;
        console.log('geo api url---', GEO_API_URL);

        // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${WEATHER_API_KEY}`

        // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}key=${GEO_API_KEY}`)
        fetch(GEO_API_URL)
        .then(res => res.json())
        .then((res) => {
            console.log('geo res---', res);
            // console.log('coords', res.results[0].geometry.location)
            setLat(res.results[0].geometry.location.lat);
            setLon(res.results[0].geometry.location.lng);
            // console.log('lat---->', lat);
            // console.log('lon---->', lon);
            return [lat, lon]
        }).then(([lat,lon]) => {
            console.log('coordinates--', [lat, lon])
            console.log('lat---', lat);
            console.log('url---', url);
            fetch(url)
            .then( (response) => {
                return response.json()
            })
            .then((response) => {
                console.log('weather res', response)
    
                if (response.cod === 400) {
                    throw new Error()
                }
                // setLat(response.city.coord.lat)
                // setLon(response.city.coord.lon)
                setResponseObj(response);
                console.log('setResponseObj---', responseObj);
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
                console.log('error----',error.message);
            })
        })
    }

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${WEATHER_API_KEY}&units=${unit}`

    async function getForecast(e) { 
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }
        // getCoordinates(e)
        // .then((res) => {
        //     console.log('RES---->', res);
        //     const {lat, lon} = res;
        //     return res
        // });
        setError(false);
        setResponseObj({});
        setLoading(true);
        console.log('url---', url)
        // setLat('');
        // setLon('');

        // await fetch(GEO_API_URL)
        // .then(res => res.json())
        // .then((res) => {
        //     console.log('geo res---', res);
        //     console.log('coords', res.results[0].geometry.location.lng)
        //     setLat(res.results[0].geometry.location.lat);
        //     setLon(res.results[0].geometry.location.lng)
        // })


        fetch(url)
        .then( (response) => {
            return response.json()
        })
        .then((response) => {
            console.log('res', response)

            if (response.cod !== 200) {
                throw new Error()
            }
            setLat(response.results.location.lat)
            setLon(response.city.coord.lon)
            setResponseObj(response);
            setLoading(false);
        })
        .catch((error) => {
            setError(true);
            setLoading(false);
            console.log(error.message);
        })
    }
    return (
        <div>
           <h2>Find Current Weather Conditions</h2>
           <div>
           </div>
           <form onSubmit={getCoordinates}>
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


           </form>
           <form onSubmit={getCoordinates}>
           <button className={classes.Button}
type="submit"> Get Weather</button>
<button type="submit"> Get Coordinates </button>
            </form>
           <Conditions 
                responseObj={responseObj}
                error={error}
                loading={loading}
           />
       </div>
    )
}

export default Forecast;
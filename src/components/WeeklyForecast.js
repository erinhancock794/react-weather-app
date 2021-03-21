import React, { useState } from 'react';
import classes from './Forecast.module.css'
import Weeklyconditions from './WeeklyConditions';
import moment from 'moment';
import _ from 'lodash';
 

const Forecast = () => {
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
    const WEATHER_API_KEY = '880bcb631f870f8a5bd11ec2bd58f4d1';

    // const GEO_API_KEY = 'AIzaSyATBnmFjxXtXzvjiq0TvbsQGlg04FCk_FE'

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [date, setDate] = useState([]);
    let [dates, setDates] = useState([]);
    let [weather, setWeather] = useState([]);

    let [time, setTime] = useState([]);
    let [allForecasts, setAllForecasts] = useState([]);


    // function getCurrentWeather(e) { 
    //     e.preventDefault();
    //     if (city.length === 0) {
    //         return setError(true);
    //     }
    //     setError(false);
    //     setResponseObj({});
    //     setLoading(true);
    //     const uriEncodedCity = encodeURIComponent(city);
    //     const url = `${WEATHER_API_URL}/weather?q=${uriEncodedCity}&appid=${WEATHER_API_KEY}&units=${unit}`;



    //     fetch(url)
    //     .then( (response) => {
    //         return response.json()
    //     })
    //     .then((response) => {
    //         console.log('res', response)

    //         if (response.cod !== 200) {
    //             throw new Error()
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

    function getWeeklyForecast(e) { 
        e.preventDefault();
        if (city.length === 0) {
            console.log('city length error');
            return setError(true);
        }
        setError(false);
        setResponseObj({});
        setLoading(true);
        setDate([]);
        setTime([]);
        setWeather([]);
        

        const uriEncodedCity = encodeURIComponent(city);
        const url = `${WEATHER_API_URL}/forecast?q=${uriEncodedCity}&appid=${WEATHER_API_KEY}&units=${unit}`;

        fetch(url)
        .then( (response) => {
            console.log('response---', response);
            return response.json()
        })
        .then((response) => {
            console.log('res', response)

            if (response.cod !== "200") {
                console.log('cod is not 200');
                throw new Error();
            }

            setResponseObj(response);
            let cityName = response.city.name;
            console.log('cityName---', cityName);
            const forecastArray = response.list;
            console.log('forecastArray---', forecastArray);
            let newForecasts = [];
            let newTime = [];
            let weatherDescription = [];

           _.forEach(forecastArray, (forecast) => {

                // console.log('forecast--', forecast);
                let time = forecast.dt_txt;
                let weather = forecast.weather[0].description;

                if (time.includes('12:00:00')) {
                    time = moment(time).format("MMMM Do")
                    newTime.push(time);
                    weatherDescription.push(weather);
                    let newThing = {
                        time,
                        weather,
                        temp: forecast.main.temp,
                        city: cityName
                    }
                    newForecasts.push(newThing);
             
                    console.log('newthing---', newThing);
                }
                // console.log('new time--->', time);

        

            });
       


            let unixDate = moment(response.list[0].dt).toString("MMMM Do YYYY, h:mm:ss a");
            console.log(response.list[0].dt);
            console.log('unix date0--', unixDate);
            console.log('NEW FORCATS--', newForecasts);

            setTime(newTime)
            setDate(newForecasts);
            setDates(newForecasts);
            setWeather(weatherDescription);

            setAllForecasts(newForecasts);
            setLoading(false);
            // return response;
        })
        .catch((error) => {
            setError(true);
            setLoading(false);
            console.log(error.message);
        })
    }



    return (
        <div>
           <form onSubmit={getWeeklyForecast}>
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
type="button" onClick={getWeeklyForecast}> Weekly Forecast</button>
             </form>
          
            <Weeklyconditions 
                responseObj={responseObj}
                error={error}
                loading={loading}
                // date={date}
                // time={time}
                // dates={dates}
                // weather={weather}
                allForecasts={allForecasts}
           />


       </div>
    )
}

export default Forecast;
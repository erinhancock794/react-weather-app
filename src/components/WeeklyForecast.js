import React, { useState } from 'react';
import classes from './Forecast.module.css'
import Weeklyconditions from './WeeklyConditions';
import moment from 'moment';
import _ from 'lodash';
 

const Forecast = () => {
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
    const WEATHER_API_KEY = '880bcb631f870f8a5bd11ec2bd58f4d1';

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [allForecasts, setAllForecasts] = useState([]);
    let [hourly, setHourly] = useState([]);


    function getWeeklyForecast(e) { 
        e.preventDefault();
        if (city.length === 0) {
            console.log('city length error');
            return setError(true);
        }
        setError(false);
        setResponseObj({});
        setLoading(true);
        setHourly([]);
        

        const uriEncodedCity = encodeURIComponent(city);
        const url = `${WEATHER_API_URL}/forecast?q=${uriEncodedCity}&appid=${WEATHER_API_KEY}&units=${unit}`;

        const d = new Date();
        const todayDayNum = d.getDate();

        fetch(url)
        .then( (response) => {
            return response.json()
        })
        .then((response) => {

            if (response.cod !== "200") {
                throw new Error();
            }

            setResponseObj(response);
            let city = response.city.name;
            const forecastArray = response.list;
            let hourlyForecasts = []
            let newForecasts = [];
            let newTime = [];
            let weatherDescription = [];

           _.forEach(forecastArray, (forecast) => {
            
                let time = forecast.dt_txt;
            
                let timezone = moment.unix((forecast.dt)-21600).format();

                
                let weather = forecast.weather[0].description;
                if (timezone.includes(`-${todayDayNum + 1}`)) {

                    let hourlyObject = {
                        time: moment(time).format("hh:mm a"),
                        temp: forecast.main.temp
                    }
                    hourlyForecasts.push(hourlyObject)


                }

                if (time.includes('12:00:00')) {
                    time = moment(time).format("MMMM Do")
                    newTime.push(time);
                    weatherDescription.push(weather);
                    let weeklyForecastData = {
                        time,
                        weather,
                        temp: forecast.main.temp,
                        city
                    }
                    newForecasts.push(weeklyForecastData);
                }
            });
            setHourly(hourlyForecasts);
            setAllForecasts(newForecasts);
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
                allForecasts={allForecasts}
                hourly={hourly}
           />

       </div>
    )
}

export default Forecast;
import React from 'react';
import classes from './WeeklyConditions.module.css';

const weeklyconditions = (props) => {
    console.log('props---', props.allForecasts);

    return (
        <div className={classes.Wrapper}>
            {props.error && <small> Please enter a valid city.</small>}
            {props.loading && <div> Loading...</div>}

            {props.allForecasts[0] ? 

                <div>
                    <h2>Forecast for {props.allForecasts[0].city}</h2> 
                </div>
                : 
                null
            }

            <div className={classes.Dates}>
                <div className={classes.ForecastInfo}>
             {(props.allForecasts).map((forecast, index) => (
                <div key={index}>
                <div className={classes.Objects}>

                <h3>{forecast.time}</h3>
                <p>{forecast.temp}</p>
                <p>{forecast.weather}</p>
             </div>
             </div>
             ))}
        </div>

        </div>

        </div>

    )
}

export default weeklyconditions;
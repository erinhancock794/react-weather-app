import React from 'react';
import classes from './Conditions.module.css';

const conditions = (props) => {
    return (
        <div className={classes.Wrapper}>
            {props.error && <small> City not found. Please enter a valid city.</small>}
            {props.loading && <div> Loading...</div>}
            {props.responseObj.cod === 200 ? 
            <div className={classes.Current}>
                <h2>{props.responseObj.name}</h2>
                <p> It is currently {Math.round(props.responseObj.main.temp)} degrees.
                </p>
            </div>
                : null
                }
        </div>

    )
}

export default conditions;
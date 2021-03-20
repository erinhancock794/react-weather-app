import React, { Component } from 'react';


export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            temperature: ''
        }
    }
    handleChange(e) {
        this.setState({ temperature: e.target.value})
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in celsius.</legend>
                <input
                value={temperature}
                onChange={this.handleChange}
                />
                <BoilingVerdict 
                celsius={parseFloat(temperature)}/>

            </fieldset>
        )
    }

}

export function BoilingVerdict(props) {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;  }
    return <p>The water would not boil.</p>;}
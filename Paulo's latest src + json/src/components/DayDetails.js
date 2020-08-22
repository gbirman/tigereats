import React from 'react';


export default class DayDetails extends React.Component {



    render () {

        return (
            <div>
            <h3> Date: {this.props.date.substring(0,2)} / {this.props.date.substring(2,4)} / {this.props.date.substring(4)} </h3>
            </div>

        );
    }
}
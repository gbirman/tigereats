import React from 'react';


// Will need to recieve name, class and team in props
export default class Profile extends React.Component {

    render() {

        return(
            <div>
            <table align = "left">
            <h3> Student Profile </h3>
            <p>{this.props.name} </p>
            <p>Class of {this.props.class} </p>
            <p>{this.props.team} </p>
            </table>
            </div>
        );

    }


}
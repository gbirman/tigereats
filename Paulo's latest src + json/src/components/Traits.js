import React from 'react';



export default class Traits extends React.Component {

    render() {

        return(
            <div>
                <table align = "left">
                    <tr align = "left">
                        <td><h3>Physical Traits</h3></td>
                    </tr>
                    <tr align = "left"><td>Height: {this.props.height}</td></tr>
                    <tr align = "left"><td>Age: {this.props.age}</td></tr>
                    <tr align = "left"><td>Weight: {this.props.weight}lbs</td></tr>
                    <tr align = "left"><td>Goal Weight: {this.props.goalWeight}lbs</td></tr>
                </table>
            </div>
        );

    }


}
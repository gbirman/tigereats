import React from 'react';
import StudentDetails from './StudentDetails';
import DaysHolder from './DaysHolder';


export default class StudentGoalsPage extends React.Component {

    // Save student data for a page refresh?
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {    
    }

    render() {

        // Things I might not need: "width:100%"
        return (
           <div>

           <table border = "3" align = "center">
            <tbody>
                <tr>
                    <StudentDetails />
                </tr>

                <tr>
                <h2>Logged Meals</h2>
                </tr>

                <tr>
                <DaysHolder />
                </tr>
            </tbody>
           </table>

                      
           </div>
        );
    }

}

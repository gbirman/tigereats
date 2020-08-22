import React from 'react';
import Button from '@material-ui/core/Button';
import PersonPic from './images/Jamie.jpg';
// Says it needs like react 16.3

export default class PersonTile extends React.Component {

    /* 
  
    */
    render() {

        // Error messages made me get rid of outer div here
        return (
                
                <table align = "left">
                <tr>
                    <td><img src={PersonPic} width = "100" height = "100" alt="Profile" /></td>
                </tr>
                <tr>
                    <td><Button variant="contained" color="primary">Send Message</Button></td>
                </tr>
                <tr>
                    <td><Button variant="contained" color="primary">Add To Favorites</Button></td>
                </tr>
                </table>
            



        );
    }

}
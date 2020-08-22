import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class TestPage extends React.Component {
    handleClick = (e) => {
        axios.get(
            'http://127.0.0.1:5000/api/get_user_email',
            {
                params: {
                user_id: "5bf8ca12e7179a56e21592c5"
            }},
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
            let details = data['data'];
            console.log(details);
        })}

    render() {
        return (
            <Button onClick={this.handleClick}>Yo</Button>
        );
    }
}
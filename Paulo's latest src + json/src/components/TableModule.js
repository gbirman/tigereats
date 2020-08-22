import React from 'react';
import Table from '@material-ui/core/Table';
import TableHeaderModule from './TableHeaderModule';
import TableBodyModule from './TableBodyModule';

//let counter = 0;
//function createData(name, last_active, gender, class_year, team, meals_logged_per_day, calories, protein, fat, carbs) {
//    counter += 1;
//    return {id: counter, name, last_active, gender, class_year, team, meals_logged_per_day, calories, protein, fat, carbs};
//}

export default class TableModule extends React.Component {
    counter = 0;
    

    
    /*([
        createData('Paulo Frazão', '1 day ago', 'Male', 2020, 'Men\'s Bowling', 3, '2000/2200', '105/135', '70/85', '170/200'),
            createData('Jamie Mercurio', '2 day ago', 'Male', 2020, 'Men\'s Running', 3, '2001/2200', '104/135', '7/85', '17/200'),
            createData('Abby Breitfeld', '3 day ago', 'Female', 2020, 'Women\'s Running', 3, '2002/2200', '100/135', '70/85', '10/200'),
        
    ]) */

    state = {
        entries: 0,
        orderBy: 'name',
        order: 'asc',
        restrictions: this.props.restrictions
        /*[
            createData('Paulo Frazão', '1 day ago', 'Male', 2020, 'Men\'s Bowling', 3, '2000/2200', '105/135', '70/85', '170/200'),
            createData('Jamie Mercurio', '2 day ago', 'Male', 2020, 'Men\'s Running', 3, '2001/2200', '104/135', '7/85', '17/200'),
            createData('Abby Breitfeld', '3 day ago', 'Female', 2020, 'Women\'s Running', 3, '2002/2200', '100/135', '70/85', '10/200'),
        ]*/
    };

    componentDidMount() {
        console.log('IJBNIEFNIFENIOEFNIRFNF');
        this.props.getUsers();
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
        console.log('a');
    }
    

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') order = 'asc';

        this.setState({order, orderBy})
    };

    render() {
        return (
            <Table style={{ width: '100%'}}>
                <TableHeaderModule 
                    orderBy={this.state.orderBy} 
                    order={this.state.order}
                    onRequestSort={this.handleRequestSort}
                />
                <TableBodyModule 
                    data={this.props.data}
                    onRequestSort={this.handleRequestSort}
                    orderBy={this.state.orderBy}
                    order={this.state.order}
                />
            </Table>
        );
    }
}
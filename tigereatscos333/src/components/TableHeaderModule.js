import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';


const rows = [
    { id: 'fullname', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'gender', numeric: false, disablePadding: true, label: 'Gender' },
    { id: 'year', numeric: false, disablePadding: true, label: 'Year' },
    { id: 'team', numeric: false, disablePadding: true, label: 'Team' },
    { id: 'calorie_goal', numeric: false, disablePadding: true, label: 'Calories'},
    { id: 'protein_goal', numeric: false, disablePadding: true, label: 'Protein'},
    { id: 'carbs_goal', numeric: false, disablePadding: true, label: 'Carbs'},
    { id: 'fats_goal', numeric: false, disablePadding: true, label: 'Fat'},
    { id: 'watchlist', numeric: false, disablePadding: false, label: 'Watchlist?'},
    { id: 'change_goals', numeric: false, disablePadding: false, label: 'Change Goals'},
    { id: 'mail', numeric: false, disablePadding: false, label: 'Send Email'},
  ];

const styles = theme => ({
    labelRoot: {
        color: '#4CA279 !important',
        fontFamily: 'Karla, sans-serif',
        textAlign: 'center',

    },
    labelActive: {
        color: '#3e8563 !important',
        fontFamily: 'Karla, sans-serif',

    },
    labelCell: {
        textAlign: 'center'
    }
});
  
export default withStyles(styles)(class TableHeaderMoudle extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    }

    render() {
        const {classes} = this.props;
        return (
            <TableHead>
                <TableRow >
                    {rows.map((row) => {
                        return (
                            <TableCell
                                className={classes.labelCell}
                                key={row.id}
                                numeric={row.numeric}
                                padding={'none'}
                                sortDirection={this.props.orderBy === row.id ? this.props.order : false}
                                
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                >
                                    <TableSortLabel
                                        className={classes.labelRoot}
                                        classes={{active: classes.labelActive, }}
                                        active={this.props.orderBy === row.id && !(row.id === 'change_goals' || row.id === 'mail')}
                                        direction={this.props.order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        <h3>{row.label}</h3>
                                    </TableSortLabel>
                                </Tooltip>   
                            </TableCell>
                        );
                    })}

                </TableRow>
            </TableHead>
        );
    }
    
    
})
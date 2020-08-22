import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link, NavLink } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';



const styles = theme => ({
    row: {
        fontFamily: 'Karla, sans-serif',
        borderTopStyle: 'solid',
        borderTopWidth: '2px',
        borderTopColor: '#4CA279',
    },
    cell: {
        textAlign: 'center',
        color: "#59BF8E",
    },
    linkCell: {
        textDecoration: 'none',
        color: '#59BF8E'
    },
    iconCell: {
        color: '#3e8563',
        cursor: "pointer",
        justiftyContent:"center", 
        alignItems:"center"
    },
    nameCell: {
        textDecoration: 'none',
        color: '#4CA279',
    }
});

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a,b) => {
        const order = cmp(a[0], b[0]);
        if (order != 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a,b) => desc(a,b,orderBy) : (a,b) => -desc(a,b,orderBy);
}


export default withStyles(styles)(class TableBodyModule extends React.Component {
    isSelected = property => {
        console.log('success');
    }

    handleWatchClick = (id, inList) => {
        console.log(id + " " + inList);
        axios.post(
            '/api/change_watchlist',
            {
                user_id: id, 
                watchlist_status: !inList // TODO: This is flipped!!!
            },
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
           // console.log("Add to Watch List:" + data);
            const result = data['data'];
            console.log(result)

            if (!result) {
                console.log("It didn't work!");
            }
            else {
               /// alert("Added to Watch List"); // get rid of this later   
            }
        })   
    }

    render () {
        const {classes} = this.props;
        console.log(this.props.data);
        return (
            <TableBody >
                { 
                    stableSort(this.props.data, getSorting(this.props.order, this.props.orderBy))
                        .map(n => {
                            
                            return (
                                
                                    <TableRow
                                        hover
                                        onClick={event => this.isSelected(n.id)}
                                        tabIndex={-1}
                                        key={n.id}
                                        className={classes.row}
                                        component={Link} to={"/test/" + n._id}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <TableCell className={classes.nameCell} align="center" >{n.fullname}</TableCell>
                                        <TableCell className={classes.cell} align="center">{n.gender}</TableCell>
                                        <TableCell className={classes.cell} align="center">{n.year}</TableCell>
                                        <TableCell className={classes.cell} align="center">{n.team}</TableCell>
                                        <TableCell className={classes.cell} align="center">{n.calorie_goal}</TableCell>
                                        <TableCell className={classes.cell} align="center">{n.protein_goal}</TableCell>
                                        <TableCell className={classes.cell} align="center">{n.carbs_goal}</TableCell>
                                        <TableCell className={classes.cell} align="center">{n.fats_goal}</TableCell>
                                        <TableCell className={classes.iconCell} align="center">{(n.watchlist) ? <DoneIcon clickable="true" onClick={(e) => {e.preventDefault(); this.props.onWatchChange(n._id, true)}}/> : <CloseIcon clickable="true" onClick={(e) => {e.preventDefault(); this.props.onWatchChange(n._id, false)}}/>}</TableCell>
                                        <TableCell className={classes.iconCell} align="center" component={Link} to={"/changeGoals/" + n._id + "/" + n.fullname + "/" + n.calorie_goal + "/" + n.protein_goal + "/" + n.fats_goal + "/" + n.carbs_goal}>
                                            <EditIcon clickable="true"/>  
                                        </TableCell>
                                        <TableCell className={classes.iconCell} align="center" component={Link} to={"/dash"}>
                                            <EmailIcon 
                                                clickable="true"
                                                onClick={(e) => {window.location.href = "mailto:" + n.email + "?subject=[TigerEats] A Message from your nutritionist!";}}
                                            />
                                        </TableCell>
                                    </TableRow> 
                            );
                        })
                }
                
            </TableBody>
        );
    }
})
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link, NavLink } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';



function stableSort(array, cmp) {
    console.log(array);
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


export default class TableBodyModule extends React.Component {
    isSelected = property => {
        console.log('success');
    }

    render () {
        return (
            <TableBody>
                { 
                    stableSort(this.props.data, getSorting(this.props.order, this.props.orderBy))
                        .map(n => {
                            
                            return (
                                    <TableRow
                                        hover
                                        onClick={event => this.isSelected(n.id)}
                                        tabIndex={-1}
                                        key={n.id}
                                    >
                                        <TableCell>
                                            <NavLink
                                                to="/test"
                                                style={{textDecoration: 'none'}}
                                            >
                                                {n.fullname}
                                            </NavLink> 
                                        </TableCell>
                                        <TableCell>{n.gender}</TableCell>
                                        <TableCell>{n.year}</TableCell>
                                        <TableCell>{n.team}</TableCell>
                                        <TableCell>{"Placeholder"}</TableCell>
                                        <TableCell>
                                            <NavLink
                                                to={"/changeGoals/" + n._id + "/" + n.fullname + "/" + n.calorie_goal + "/" + n.protein_goal + "/" + n.fats_goal + "/" + n.carbs_goal}
                                                style={{textDecoration: 'none'}} 
                                            >
                                                {n.calorie_goal}
                                            </NavLink> 
                                        </TableCell>
                                        <TableCell>
                                            <NavLink
                                                to={"/changeGoals/" + n._id + "/" + n.fullname + "/" + n.calorie_goal + "/" + n.protein_goal + "/" + n.fats_goal + "/" + n.carbs_goal}
                                                style={{textDecoration: 'none'}}
                                            >
                                                {n.protein_goal}
                                            </NavLink> 
                                        </TableCell>
                                        <TableCell>
                                            <NavLink
                                                to={"/changeGoals/" + n._id + "/" + n.fullname + "/" + n.calorie_goal + "/" + n.protein_goal + "/" + n.fats_goal + "/" + n.carbs_goal}
                                                style={{textDecoration: 'none'}}
                                            >
                                                {n.carbs_goal}
                                            </NavLink> 
                                        </TableCell>
                                        <TableCell>
                                            <NavLink
                                                to={"/changeGoals/" + n._id + "/" + n.fullname + "/" + n.calorie_goal + "/" + n.protein_goal + "/" + n.fats_goal + "/" + n.carbs_goal}
                                                style={{textDecoration: 'none'}}
                                            >
                                                {n.fats_goal}
                                            </NavLink> 
                                        </TableCell>
                                        <TableCell>
                                            <EmailIcon 
                                                clickable="true"
                                                style={{cursor: "pointer"}} 
                                                onClick={(e) => {window.location.href = "mailto:" + n.email + "?subject=[TigerEats] A Message from your nutritionist!&body=Hi " + n.firstname + ",\n";}}
                                            />
                                        </TableCell>
                                        
                                    </TableRow>
                            );
                        })
                }
                
            </TableBody>
        );
    }
}
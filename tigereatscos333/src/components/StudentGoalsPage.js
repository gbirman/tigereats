import React from 'react';
import StudentDetails from './StudentDetails';
import DaysHolder from './DaysHolder';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';



export default class StudentGoalsPage extends React.Component {

    state = {
        dayInfo0: 'joe',   // []  if i had it as [], or {}, it wouldn't work!!!!
        dayInfo1: 'joe',
        dayInfo2: 'joe',
        dayInfo3: 'joe',
        dayInfo4: 'five',
        userInfo: "bilal",
        dateArray: [this.getToday(0), this.getToday(1), this.getToday(2), this.getToday(3), this.getToday(4)]
    };

    componentWillMount() {
        axios.get(
            '/api/user_role',
            {
                headers: {'Content-type': 'application/json'}
            }
        ).then((data) => {
            const result = data['data'];
            if (!result) {
                this.props.history.push("/error");
            }
            /*else {
                this.props.history.push("/error")
            } */
        })
    }

    // Save student data for a page refresh?
    componentDidMount() {
        // console.log("---------------------------DATES---------------------"); // debugging
        // console.log(this.getToday(0));
        // console.log(this.getToday(1));
        // console.log(this.getToday(2));
        // console.log(this.getToday(3));
        // console.log(this.getToday(4));  

        this.getDayInfo(this.props.match.params.id, this.state.dateArray[0], 0); // get date there
        this.getDayInfo(this.props.match.params.id, this.state.dateArray[1], 1);
        this.getDayInfo(this.props.match.params.id, this.state.dateArray[2], 2);
        this.getDayInfo(this.props.match.params.id, this.state.dateArray[3], 3);
        this.getDayInfo(this.props.match.params.id, this.state.dateArray[4], 4);
        this.getUserInfo(this.props.match.params.id); 
    }

    componentDidUpdate(prevProps, prevState) {    
    }

    getUserInfo = async (user_id) => { // attempt at adding async
        await axios.get( // attempt at adding async
            '/api/get_all_user_info',
            {

                params: {
                user_id: user_id
                }
            },
            {
                headers: { 'Content-type': 'application/json' }
            }
        ).then((data) => {
            let details = data['data'];

           // console.log("User's email " + details[0] + "<- is here");
            
            this.setState((prevState) => {
              return {  
                dayInfo0: prevState.dayInfo0,
                dayInfo1: prevState.dayInfo1,
                dayInfo2: prevState.dayInfo2,
                dayInfo3: prevState.dayInfo3,
                dayInfo4: prevState.dayInfo4,
                dateArray: prevState.dateArray,
                userInfo: details,
               // dayInfoArray: prevState.dayInfoArray // Testing for multiple days
              }
            });    
        })}


    


    // Gets a day's info given a user and a date
    getDayInfo = (user_id, date, day) => {
          axios.get(
                '/api/get_user_day_meal_data',
                {

                    params: {
                    user_id: user_id,
                    date: date
                    }
                },
                {
                    headers: { 'Content-type': 'application/json' }
                }
            ).then((data) => {
                let details = data['data'];

                // console.log("The real deets " + details[0].calories + "<- are there");
                
                let dayInfoUpdated = [];
 

                if (day == 0) {
                this.setState((prevState) => {
                        return {  

                        dayInfo0: data['data'], 
                        dayInfo1: prevState.dayInfo1,
                        dayInfo2: prevState.dayInfo2,
                        dayInfo3: prevState.dayInfo3,
                        dayInfo4:prevState.dayInfo4,
                        dateArray: prevState.dateArray

                        }
                });    
                }

                if (day == 1) {
                    this.setState((prevState) => {
                            return {  
                            dayInfo0: prevState.dayInfo0,
                            dayInfo1: data['data'], 
                            dayInfo2: prevState.dayInfo2,
                            dayInfo3: prevState.dayInfo3,
                            dayInfo4:prevState.dayInfo4,
                            dateArray: prevState.dateArray

                            }
                    });    
                    }

                    if (day == 2) {
                        this.setState((prevState) => {
                                return {  
                                dayInfo0: prevState.dayInfo0,
                                dayInfo1: prevState.dayInfo1,
                                dayInfo2: data['data'], 
                                dayInfo3: prevState.dayInfo3,
                                dayInfo4:prevState.dayInfo4,
                                dateArray: prevState.dateArray

                                }
                        });    
                        }

                        if (day == 3) {
                            this.setState((prevState) => {
                                    return {  
                                    dayInfo0: prevState.dayInfo0,
                                    dayInfo1: prevState.dayInfo1,
                                    dayInfo2: prevState.dayInfo2,
                                    dayInfo3: data['data'],
                                    dayInfo4:prevState.dayInfo4,
                                    dateArray: prevState.dateArray
                                   
                                    }
                            });    
                        }

                        if (day == 4) {
                            this.setState((prevState) => {
                                    return {  
                                    dayInfo0: prevState.dayInfo0,
                                    dayInfo1: prevState.dayInfo1,
                                    dayInfo2: prevState.dayInfo2,
                                    dayInfo3: prevState.dayInfo3,
                                    dayInfo4: data['data'],
                                    dateArray: prevState.dateArray
                                 }
                              });    
                        }



            })}
    
    
            // TODO: I'll need to create the list of days here, I currently only get one (today)
            // this day and not just getDay()
           // let daysPreprocessed = this.getDay(this.props.userID, this.props.date); // MOVE
           // console.log(daysPreprocessed); // DEBUGGING

    // This gets today - I don't yet use it because we don't neccessarily have data for the last 4 days
    getToday(daysBefore) { // can be changed to get yesterdays date, etc (I'm sure there's a method we can use)
       let  today = new Date();
       let  actualDay = new Date(today);
        actualDay.setDate(today.getDate() - daysBefore);
    
    
        // let today = new Date();
        let dd = actualDay.getDate();
        let mm = actualDay.getMonth()+1; //January is 0!
        let yyyy = actualDay.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        let todayFormatted = yyyy + "-" + mm + "-" + dd;
       // console.log("Today is: " + today); // Debugging
        return todayFormatted;
    }

    render() {

        const textStyle = {
            color: "#59BF8E",
            fontFamily: 'Karla, sans-serif',
            textDecorationLine: 'underline',
        }


       // console.log("Paulo's UID = " + JSON.stringify(this.props.match.params.id));
        let user_id = this.props.match.params.id; // From dashboard

        let date = "2018-07-10";

       /* let userInfoTest = ["jamie@tigermag.com", "Jamies", "Mercurio",
                            "Male", "5 9", "150lbs", "no restrictions mofo", 
                        "1000CAL", "2000PRO", "0FAT", "350POUNDSMUSCLE", "2020", "Little League MMA"]; */
       
        let fullName = this.state.userInfo[1] + " " + this.state.userInfo[2];


        // Debugging meal info acqusition:
        // console.log("\n 7/10 \n" + JSON.stringify(this.state.dayInfo0));
        // console.log("\n 7/11 \n:" + JSON.stringify(this.state.dayInfo1));
        // console.log("\n 7/12 \n:" + JSON.stringify(this.state.dayInfo2));
        // console.log("\n 7/13 \n:" + JSON.stringify(this.state.dayInfo3));


        // TODO: dayInfoArray = {this.state.dayInfoArray}

        /*
        Old table code
<div>

           <table border = "3" align = "center">
            <tbody>
                <tr>
                    <StudentDetails
                    user_id = {user_id}
                    userInfo = {this.state.userInfo}
                    fullName = {fullName}
                    />
                </tr>

                <tr>
                <h2>Logged Meals</h2>
                </tr>

                <tr>
                <DaysHolder 
                user_id = {user_id}
                date = {date}
                dayInfo0 = {this.state.dayInfo0}
                dayInfo1 = {this.state.dayInfo1}
                dayInfo2 = {this.state.dayInfo2}
                dayInfo3 = {this.state.dayInfo3}
                
                />
                </tr>
            </tbody>
           </table>

                      
           </div>



        */

        

        return (
           <div>

           <Grid 
           container
           direction="column"
           justify="center"
           alignItems="stretch"
           >
           <Grid item>
                    <StudentDetails
                    user_id = {user_id}
                    userInfo = {this.state.userInfo}
                    fullName = {fullName}
                    dayInfo = {this.state.dayInfo0}
                    />
            </Grid>


            <Grid item style={textStyle} align = "center">
                <h2> Logged Meals</h2>
            </Grid>

            <Grid item>
                <DaysHolder 
                user_id = {user_id}
                dateArray = {this.state.dateArray}
                dayInfo0 = {this.state.dayInfo0}
                dayInfo1 = {this.state.dayInfo1}
                dayInfo2 = {this.state.dayInfo2}
                dayInfo3 = {this.state.dayInfo3}
                dayInfo4 = {this.state.dayInfo4}
                />
            </Grid>

           </Grid>

                      
           </div>
        );
    }

}

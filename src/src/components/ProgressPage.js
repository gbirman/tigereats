import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import {styler} from 'react-timeseries-charts';
import { TimeSeries, avg, sum, Index, filter, TimeRange} from 'pondjs';
import "moment-duration-format";
import moment from "moment";
import Grid from '@material-ui/core/Grid';
import RadioButtons from "./RadioButtons";
import CheckBoxes from "./CheckBoxes";
import ChannelsChart from "./ChannelsChart";
import BrushChart from "./BrushChart";
import {nutrientcolors} from '../styles/color';
import TrackerTime from './TrackerTime';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import {themecolors} from '../styles/color';
import LegendString from './LegendString';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = styler([
    { key: "calories", color: nutrientcolors.calories},
    { key: "carbs", color: nutrientcolors.carbs },
    { key: "fat", color: nutrientcolors.fat },
    { key: "protein", color: nutrientcolors.protein }
]);

// these are the names of the nutrients as specified in MongoDB 
// with associated metadata 
const channels = {
    calories: { units: "kcal", label: "Calories", show: true, goal: null,
        dailyseries_null: null, dailyseries: null, weeklyseries_null: null, weeklyseries: null, 
        monthlyseries_null: null, monthlyseries: null, subseries: null, amount: null },
    carbs: { units: "g", label: "Carbs", show: true, goal: null,
        dailyseries_null: null, dailyseries: null, weeklyseries_null: null, weeklyseries: null, 
        monthlyseries_null: null, monthlyseries: null, subseries: null, amount: null },
    fat: { units: "g", label: "Fat", show: true, goal: null,
        dailyseries_null: null, dailyseries: null, weeklyseries_null: null, weeklyseries: null, 
        monthlyseries_null: null, monthlyseries: null, subseries: null, amount: null },
    protein: { units: "g", label: "Protein", show: true, goal: null,
        dailyseries_null: null, dailyseries: null, weeklyseries_null: null, weeklyseries: null, 
        monthlyseries_null: null, monthlyseries: null, subseries: null, amount: null }
}

// these are the names of the nutrients as specified in MongoDB 
const channelNames = ['protein', 'fat', 'carbs', 'calories'];

// this is the main display for the user's progress page 

class ProgressPage extends React.Component {

    // functions to set window size in state 
    setWindowDay = () => this.setState(() => ({ rollupSize: "day" }));
    setWindowWeek = () => this.setState(() => ({ rollupSize: "week" }));
    setWindowMonth = () => this.setState(() => ({ rollupSize: "month" }));

    state = {
        ready: false,
        channels: channels,
        tracker: null,
        timerange: null,
        totalrange: null,
        totalseries: null,
        trackerIdx: null,
        maxHeight: null,
        rollupSize: 'day',
        mintime: null,
        maxtime: null,
        values: {calories: "--", carbs: "--", fat: "--", protein: "--"},
        initial_width: window.innerWidth,
        initial_height: window.innerHeight, 
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

    componentDidMount() {

        // allows for async call 
        setTimeout(() => {

             // get calorie goal from server 
             axios.get(
                '/api/get_user_nutrition_goals',
                {
                    params: {
                    user_id: `${this.props.match.params.id}`
                }},
                {
                    headers: {'Content-type': 'application/json'}
                }
            ).then((response) => {
                let data = response['data'];
                
                // add goal data according to API-specified order 
                channels['calories'].goal = data[0];
                channels['protein'].goal = data[1];
                channels['fat'].goal = data[2];
                channels['carbs'].goal = data[3];
                this.setState(() => ({ channels }));
            });

            // get nutrient progress from server, then render 
            axios.get(
                // remove "_dummy" to get real data from server
                // currently waiting on Ishan to speed it up
                '/api/get_user_nutrient_progress_all',
                {
                    params: {
                    user_id: `${this.props.match.params.id}`
                }},
                {
                    headers: {'Content-type': 'application/json'}
                }
            ).then((response) => {
                let data = response['data'];
                
                // process data into appropriate channels

                const points = {};
                channelNames.map(channelName => {
                    points[channelName] = [];
                });

                _.forEach(data, (response_nutrients, response_date) => {
                    // assumes date string is provided in UTC time  
                    // 1 day is needed to be added for the rollups to work 
                    // properly (they currently do not support utc time)
                    // so UTC 12 am is one day less 
                    const d = moment(response_date).add(1, 'days').toDate();
                    const index = Index.getIndexString("1d", d)
                    channelNames.map(channelName => {
                        points[channelName].push([index, response_nutrients[channelName]])
                    });
                });

                // make the TimeSeries here from points collected above
                channelNames.map(channelName => {

                    // The TimeSeries itself, for this channel
                    const initialseries = new TimeSeries({
                        name: channelName,
                        columns: ["index", channelName],
                        points: points[channelName]
                    });

                    // AVERAGE rollups by size
                    // the ignoremissing filter allows us to distinguish between null 
                    // and zero data

                    let dailyseries_null = initialseries.dailyRollup({
                        aggregation: {[channelName]: {[channelName]: avg(filter.ignoreMissing)}}
                    });

                    // this gets weekly rollups starting on a thursday
                    // since it starts on UTC Jan 1, 1970 -- a thursday. 
                    // To change this you could move the data back to the thursday, 
                    // roll it up, then shift it back?
                    let weeklyseries_null = dailyseries_null.fixedWindowRollup({
                        windowSize: "7d",
                        aggregation: {[channelName]: {[channelName]: avg(filter.ignoreMissing)}}
                    });

                    let monthlyseries_null = dailyseries_null.monthlyRollup({
                        aggregation: {[channelName]: {[channelName]: avg(filter.ignoreMissing)}}
                    });
                    
                    // The following converts series back to UTC format as rollups revert that 
                    // Going forward a proper UTC standard will be necessary
                    // this is pretty hacky tbh but it worked

                    // daily series null will be used for omitting zeroes 
                    // from calculations -- everywhere else zeroes will 
                    // be used for performance 
                    dailyseries_null = TimeSeries.timeSeriesListMerge({
                        seriesList: [dailyseries_null]
                    });

                    // as above 
                    weeklyseries_null = TimeSeries.timeSeriesListMerge({
                        seriesList: [weeklyseries_null]
                    });

                    monthlyseries_null = TimeSeries.timeSeriesListMerge({
                        seriesList: [monthlyseries_null]
                    });

                    // replaces nulls with zeroes
                    const dailyseries = dailyseries_null.fill({fieldSpec: channelNames})
                    const weeklyseries = weeklyseries_null.fill({fieldSpec: channelNames})
                    const monthlyseries = monthlyseries_null.fill({fieldSpec: channelNames})

                    // Raw series
                    channels[channelName].dailyseries_null = dailyseries_null;
                    channels[channelName].dailyseries = dailyseries;
                    channels[channelName].weeklyseries_null = weeklyseries_null;
                    channels[channelName].weeklyseries = weeklyseries;
                    channels[channelName].monthlyseries_null = monthlyseries_null;
                    channels[channelName].monthlyseries = monthlyseries;
                    channels[channelName].subseries = dailyseries_null;

                    // for the label axis, set the max value to the max of either the channel 
                    // value itself, or the goal of the channel 
                    channels[channelName].max = Math.max(parseInt(dailyseries.max(channelName), 10), 
                                                    channels[channelName].goal);
                }); 
                
                // The following operations are also quite hacky but since our
                // brush chart is a stacked bar chart this is how I figured
                // I would get the max of the sums in order to display
                // the vertical range approriately  

                // represent the entirety of the data for bottom barchart 
                const totalseries = TimeSeries.timeSeriesListMerge({
                     seriesList: channelNames.map(channelName => 
                        channels[channelName].dailyseries)
                 });

                 // get the max sum for the barchart 
                 // for the total series display 
                const sumseries = totalseries.collapse({
                    name: "sum",
                    reducer:  sum(), 
                    fieldSpecList: channelNames
                });
                const maxHeight = sumseries.max('sum');

                // represents range of entire loaded series 
                let totalrange = totalseries.range(); 

                // gets the start and end of the range in terms of start of days
                const mintime = moment(totalrange.begin()).utc().startOf('day');
                const maxtime = moment(totalrange.end()).utc().endOf('day');

                totalrange = new TimeRange(mintime, maxtime);

                // set state and calls render! 
                this.setState(() => ({ ready: true, channels, maxHeight, 
                    timerange: totalrange, totalrange, totalseries, mintime, maxtime}));

            });

        }, 1000); // one second timeout 
    };

    // deals w changes to the tracker in the channels chart component 
    handleTrackerChanged = (t) => {
        const { channels, rollupSize, timerange, values } = this.state

        let trackerIdx = null;

        // we get the tracker index here because each of the channels 
        // has the same tracker indexso it more computationally efficient to calculate
        // the index for the first channel and then perform relevant operations 
        // with that index later 

        let series = null; 
        let channelName = channelNames[0];
        if (rollupSize === 'day') {
            series = channels[channelName].dailyseries;
        } else if (rollupSize === 'week') {
            series = channels[channelName].weeklyseries;
        } else if (rollupSize === 'month') {
            series = channels[channelName].monthlyseries;
        }

        if (t >= timerange.begin() && t <= timerange.end()) { // if selected in channel chart range 
            trackerIdx = series.bisect(new Date(t));
        } else {  // display null values and return 
            this.setState(() => ({ tracker: null, trackerIdx: null, values: {
                calories: "--", carbs: "--", fat: "--", protein: "--" } }));
            return; 
        }

        // determine which channels to display 
        const displayChannels = channelNames.filter(channelName => {
            if (channels[channelName].show) {
                return true;
            } else {
                return false;
            }
        })

        // for each channel figure out the value at that 
        // tracker index 
        displayChannels.map(channelName => {

            let series = null; 
            let nullseries = null;
            if (rollupSize === 'day') {
                series = channels[channelName].dailyseries;
                nullseries = channels[channelName].dailyseries_null;
            } else if (rollupSize === 'week') {
                series = channels[channelName].weeklyseries;
                nullseries = channels[channelName].weeklyseries_null;
            } else if (rollupSize === 'month') {
                series = channels[channelName].monthlyseries;
                nullseries = channels[channelName].monthlyseries_null;
            }

            if (nullseries.at(trackerIdx).get(channelName)) {
                values[`${channelName}`] = 
                    parseInt(series.at(trackerIdx).get(channelName), 10);
            } else {
                values[`${channelName}`] = "--"; 
            }

        });

        this.setState(() => ({ tracker: t, trackerIdx, values }));

    };

    // Handles when the brush changes the timerange or the user 
    // zooms, pans, etc. the logic here is kind of tricky
    handleTimeRangeChange = (timerange) => {
        const { channels, rollupSize, tracker, mintime, maxtime } = this.state;
        
        if (timerange) {

            // Note this code works as long as the minimum time
            // unit is in terms of days within the supplied data 
            // i.e. if you wanted to specify hours of meal consumption 
            // for breakfast, lunch, and dinner, you would have to 
            // rework the logic here (the degree to which idk)

            // get range endings 
            const rangebegin = moment(timerange.begin()).utc();
            const rangeend = moment(timerange.end()).utc();

            // get start of the day from the range 
            let daystart = null
            if (rangebegin.isSameOrBefore(mintime)) { // hit lower bound
                daystart = mintime; 
            } else if (rangebegin.isSameOrAfter(maxtime)) { // hit upper bound 
                daystart = maxtime.clone().subtract(1, 'days');
            } else {
                daystart = rangebegin.clone().startOf('day'); // as usual 
            }

            // get end of the day from the range 
            let dayend = null
            // this part is necessary to prevent zooming getting stuck with React-TimeSeries-Charts 
            // if (rangeend.clone().startOf('day').isSameOrBefore(mintime.clone().add(2, 'days'))) {
            //     dayend = mintime.clone().add(3, 'days');
            if (rangeend.isSameOrAfter(maxtime)) { // hit upper bound 
                dayend = maxtime
            } else if (rangeend.isSameOrBefore(mintime)) { // hit lower bound 
                dayend = mintime.clone().add(1, 'days');
            } else {
                dayend = rangeend.clone().startOf('day'); // as usual 
            }

            // make sure dayend is at least a day greater than start end 
            // erasing this becomes an issue during zooming too close 
            if (dayend.isSameOrBefore(daystart.clone().add(1, 'days'))) {
                dayend = daystart.clone().add(1, 'days');
            }

            // get beginning and ending position for indexing 
            // optimization: slice faster than crop 
            let timerangeBegin = daystart.toDate();
            let timerangeEnd = dayend.toDate();
            let channelName = channelNames[0];
            let initseries = channels[channelName].dailyseries;
            let beginPos = initseries.bisect(timerangeBegin);
            const bisectedEventOutsideRange = initseries.at(beginPos).timestamp() < timerangeBegin;
            beginPos = bisectedEventOutsideRange ? beginPos + 1 : beginPos;
            let endPos = initseries.bisect(timerangeEnd, beginPos); 
            
            // set subseries for displaying in channels chart component  
            channelNames.map(channelName => {
                channels[channelName].subseries = 
                    channels[channelName].dailyseries_null.slice(beginPos, endPos);
            });

            this.setState({ channels, timerange: new TimeRange(daystart, dayend)});
                
        } else {
            // resets and updates values accordingly for a null click to the full range
            this.handleTimeRangeChange(this.state.totalrange );
        }
    };

    // determines which channels to show/not show in the chart 
    toggleChannelShow = channelName => {
        let channels = this.state.channels;

        channels[channelName].show = !channels[channelName].show;
        this.setState(() => ({channels}));
    }

    render() {
    
        const { ready, channels, rollupSize, tracker, timerange, 
            initial_height, initial_width} = this.state;

        // wait for the data to be retrieved/aggregated, show 
        // a loading bar while waiting 
        if (!ready) {
            return (
                <div>
                    <CircularProgress style={{
                        // width: `${initial_width/4}px`,
                        // height: `${initial_height/4}px`,
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        // marginLeft: `${-initial_width/8}px`,
                        // marginTop: `${-initial_width/8}px`,
                        color: `${this.props.theme.palette.primary.main}`
                        }} />
                </div>
                );
        }

        return (
            // this part is just a bunch of conditional renders depending on the 
            // width of the screen -- you kinda just have to see it 
            <div>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    style={{height: "100%", width:"100%"}}
                    variant="determinate"
                >
                    <Grid item xs={12} style={{marginLeft: "1%", marginRight: "1%"}}> 

                        {/* this display is too prevent crowding which causes a newline
                        in the checkboxs and radio buttons */}
                        {isWidthUp('md', this.props.width) 
                        ?
                        <Grid 
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="stretch"
                            style={{height: 50}}
                        >
                            <Grid item xs={2.5}>
                                <RadioButtons 
                                    setWindowDay={this.setWindowDay}
                                    setWindowWeek={this.setWindowWeek}
                                    setWindowMonth={this.setWindowMonth}
                                    rollupSize={this.state.rollupSize}
                                    smallScreen={false}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <CheckBoxes 
                                    toggleChannelShow={this.toggleChannelShow}
                                    channelNames={channelNames}
                                    channels={this.state.channels}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TrackerTime {...this.state}>Hi</TrackerTime>
                            </Grid>
                        </Grid> 
                        :
                        <Grid 
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="stretch"
                            style={{backgroundColor: `${themecolors.darkgray}`,
                                height: `${isWidthUp('sm', this.props.width) ? "80px" : "120px"}`}}
                        >
                            <Grid item xs={isWidthUp('sm', this.props.width) ? 12 : 9}>
                                <Grid 
                                    container
                                    direction="column"
                                    justify="space-evenly"
                                    alignItems="stretch"
                                >
                                    {isWidthUp('sm', this.props.width)
                                    ?
                                    <React.Fragment>
                                    <Grid item xs={12}>
                                        <Grid 
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="stretch"
                                            style={{height: "40px"}}
                                        >
                                            <Grid item xs={6}>
                                                <RadioButtons 
                                                    setWindowDay={this.setWindowDay}
                                                    setWindowWeek={this.setWindowWeek}
                                                    setWindowMonth={this.setWindowMonth}
                                                    rollupSize={this.state.rollupSize}
                                                    smallScreen={true}
                                                /> 
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TrackerTime 
                                                    {...this.state} 
                                                    smallScreen={true}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CheckBoxes 
                                            toggleChannelShow={this.toggleChannelShow}
                                            smallScreen={true}
                                            channelNames={channelNames}
                                            channels={this.state.channels}
                                        />
                                    </Grid>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                    <Grid item xs={12}>
                                        <RadioButtons 
                                            setWindowDay={this.setWindowDay}
                                            setWindowWeek={this.setWindowWeek}
                                            setWindowMonth={this.setWindowMonth}
                                            rollupSize={this.state.rollupSize}
                                            smallScreen={true}
                                        /> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CheckBoxes 
                                            toggleChannelShow={this.toggleChannelShow}
                                            smallScreen={true}
                                            channelNames={channelNames}
                                            channels={this.state.channels}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TrackerTime 
                                            {...this.state} 
                                            smallScreen={true}
                                        />
                                    </Grid>
                                    </React.Fragment>
                                    
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        }   
                    </Grid> 
                    
                    {/* display legend when screen is xs */}
                    {isWidthDown('xs', this.props.width) 
                    ?
                    <Grid item xs={12}>
                        <LegendString /> 
                     </Grid>
                     :
                     <div/>
                    }
                    
                    {/* display channels chart*/}
                    <Grid item xs={12}>
                        <ChannelsChart 
                            {...this.state}
                            handleTimeRangeChange={this.handleTimeRangeChange}
                            handleTrackerChanged={this.handleTrackerChanged}
                            channelNames={channelNames}
                            style={style}
                        />
                    </Grid> 

                    {/* display brush when screen >= sm */}
                    {isWidthUp('sm', this.props.width) 
                    ?
                    <Grid item xs={12}>
                        <BrushChart 
                            {...this.state}
                            handleTimeRangeChange={this.handleTimeRangeChange}
                            channelNames={channelNames}
                            style={style}
                        />
                     </Grid>
                     :
                     <div/>
                    }
            </Grid> 
            </div>
        );

    };
}

export default withWidth({withTheme: true})(ProgressPage);
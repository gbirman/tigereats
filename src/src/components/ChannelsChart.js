import React from 'react';
import {ChartRow, LabelAxis, Charts, Baseline,
        ValueAxis, ChartContainer, Resizable,
        BarChart} from 'react-timeseries-charts';
import { filter} from 'pondjs';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import {themecolors, nutrientcolors} from '../styles/color';
import { withStyles } from '@material-ui/core/styles';

// OK, so I know the black background for the channels chart
// is kind of weird, but the React-time-series-charts API 
// doesnt let you access the color values for either the LabelAxis or the 
// ValueAxis (only the box that surrounds those). Since the colors
// are pretty opposed, black was one of the few colors where both 
// would be visible enough. Worst comes to worst, you'll have 
// to access the elements through the DOM and set the inner-html,
// but they're mad nested and don't have id's so have fun with that

const styles = theme => ({
    paper: {
        //...theme.mixins.gutters(),
        //paddingTop: theme.spacing.unit * 2,
        //paddingBottom: theme.spacing.unit * 2,
        backgroundColor: "black", //`${themecolors.darkgray}`,
        height: "100%",
        marginLeft: "1%",
        marginRight: "1%",
        [theme.breakpoints.only('sm')]: {
            marginTop: theme.spacing.unit*2,
          },
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    }
});

// this is the main chart, the meat and potatoes,
// if you will. 

const ChannelsChart = (props) => {

    // hide axis when too small 
    const abovesm = useMediaQuery(`(min-width:${props.theme.breakpoints.values.sm}px)`);
    // for tick counts -- we want to prevent crowding
    const abovemd = useMediaQuery(`(min-width:${props.theme.breakpoints.values.md}px)`); 

    // dynamic resizing 
    // the number 325 has been hardcoded but it is based on 
    // the heights of the nav bar and the other elements 
    // so this can be made dynamic 
    let containerHeight = null 
    if (abovemd) {
        if (window.innerHeight >= 340+325) {
            containerHeight = window.innerHeight - 325;
        } else {
            containerHeight = 340; 
        }
    } else if (abovesm && !abovemd) {
        if (window.innerHeight >= 340+325) {
            containerHeight = window.innerHeight - 325;
        } else {
            containerHeight = 340; 
        }
    } else {
        if (window.innerHeight >= 315+325) {
            containerHeight = window.innerHeight - 325;
        } else {
            containerHeight = 315; 
        }
    }


    const {classes} =  props;
    const { channels, tracker, timerange, 
            rollupSize, channelNames, style, values} = props;

    const rows = [];

    // determine which channels to display 
    const displayChannels = channelNames.filter(channelName => {
        if (channels[channelName].show) {
            return true;
        } else {
            return false;
        }
    })
    
    // let values = {};
    displayChannels.map(channelName => {

        let series = null; 
        if (rollupSize === 'day') {
            series = channels[channelName].dailyseries;
        } else if (rollupSize === 'week') {
            series = channels[channelName].weeklyseries;
        } else if (rollupSize === 'month') {
            series = channels[channelName].monthlyseries;
        }

        const charts = [];
        charts.push(
            <BarChart
                key={`bar-${channelName}`}
                axis={`${channelName}_axis`}
                series={series}
                columns={[channelName]}
                style={style}
                breakLine={true}
                minBarHeight={0}
            />     
        );

        // Get the summary values for the LabelAxis
        // these depend on the current subseries so it's a pretty
        // nifty real-time aggregation 
        let subseries = channels[channelName].subseries;
        const summary = [
            { label: "Min", value: parseInt(subseries.min(channelName, filter.ignoreMissing), 10) || '--' },
            { label: "Max", value: parseInt(subseries.max(channelName, filter.ignoreMissing), 10) || '--' },
            { label: "Avg", value: parseInt(subseries.avg(channelName, filter.ignoreMissing), 10) || '--' },
            { label: "Goal", value: parseInt(channels[channelName].goal) || '--' }
        ];

        // represents each chart row
        rows.push(
            <ChartRow
                height={containerHeight / displayChannels.length}
                key={`row-${channelName}`}
            >
                {/* look at left side of the chart! */}
                <LabelAxis
                    visible={abovesm}
                    id={`${channelName}_axis`}
                    label={channels[channelName].label}
                    values={summary}
                    min={0}
                    max={channels[channelName].max}
                    width={100}
                    type="linear"
                    format="d"
                    style = { {axis: { fontSize: 11, textAnchor: "left", stroke: `${themecolors.lightgrey}` }, 
                            label: { fontSize: 12, textAnchor: "middle", fill: `${nutrientcolors[channelName]}`}, 
                            values: { fill: "none", stroke: "none" }} }
                />
                <Charts>
                    {charts}
                    <Baseline
                        key={`line-${channelName}`}
                        axis={`${channelName}_axis`}
                        value={channels[channelName].goal}
                        //label={`Goal: ${parseInt(channels[channelName].goal)}`}
                        style = {{ line: { stroke: "white", strokeWidth: 0.5, strokeDasharray: "4,4", pointerEvents: "none" } }}
                    />
                </Charts>
                {/* look at left side of the chart! */}
                <ValueAxis
                    id={`${channelName}_valueaxis`}
                    value={values[`${channelName}`]}
                    detail={channels[channelName].units}
                    width={70}
                    min={0}
                    max={35} // the number here seems to be irrelevant but if i remove max shit breaks
                />
            </ChartRow>
        );

    });

    return (
        <Paper className={classes.paper}>
         {/* dynamically resizes (only!) width with container size */}
        <Resizable> 
            <ChartContainer
                timeRange={timerange}
                utc={true}
                timeAxisTickCount={abovemd ? 10 : 5}
                trackerPosition={tracker}
                onTimeRangeChanged={props.handleTimeRangeChange}
                onTrackerChanged={props.handleTrackerChanged}
                enablePanZoom={true}
                paddingTop={2}
                paddingLeft={10}
                paddingRight={10}
                hideTimeAxis={abovesm ? false : true}
            >
                {rows}
            </ChartContainer> 
        </Resizable>
        </Paper>
    );
    
};

export default withStyles(styles, { withTheme: true })(ChannelsChart);
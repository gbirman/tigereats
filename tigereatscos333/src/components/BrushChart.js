import React from 'react';
import {ChartRow, Charts, YAxis, Brush,
    ChartContainer, Resizable,
    BarChart} from 'react-timeseries-charts';
import Paper from '@material-ui/core/Paper';
import {themecolors} from '../styles/color';
import { withStyles } from '@material-ui/core/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';

const styles = theme => ({
    paper: {
        backgroundColor: `${themecolors.darkgray}`,
        [theme.breakpoints.down('sm')]: {
            height: "70px",
        },
        height: "100px",
        marginLeft: "1%",
        marginRight: "1%",
    }, 
    modalpaper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    }, 
    iconbutton: {
        float: 'right', 
        marginTop: '-5px', 
        minHeight: '0px',
        minWidth: '0px',
        padding: '0px',
        "position": "relative",
        "z-index": "5"
    }
});

// this stateless component represents the brush below
// the channesl chart 

const getModalStyle = () => {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const BrushChart = (props) => {

    const {classes} =  props;
    const { ready, totalseries, totalrange, 
        timerange, maxHeight, tracker, channelNames, style } = props;

    // hide axis when too small 
    const abovesm = useMediaQuery(`(min-width:${props.theme.breakpoints.values.sm}px)`);
    // for tick counts -- we want to prevent crowding
    const abovemd = useMediaQuery(`(min-width:${props.theme.breakpoints.values.md}px)`); 

    // these are hooks supported in the react alpha version
    // used for modal display toggle
    const [open, setOpen] = React.useState(false); 
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    return (
        <Paper className={classes.paper}>
            {/* This is the explanation modal */}
            <IconButton onClick={handleOpen} className={classes.iconbutton} color="primary">
                <HelpIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={getModalStyle()} className={classes.modalpaper}>
                    <Typography variant="h6" id="modal-title" color="primary">
                    Resize the time series by panning, shrinking, or expanding the brush. 
                    You can also use scroll to zoom in and out when hovering 
                    over the main chart.  
                    </Typography>
                </div>
            </Modal>
            {/* This is the time series */}
            <Resizable>
                { ready 
                    ? 
                    <ChartContainer
                        timeRange={totalrange}
                        format={"%b-%y"}
                        trackerPosition={tracker}
                        paddingTop={5}
                        paddingLeft={15}
                        paddingRight={15}
                        timeAxisStyle={{axis: {fill: "none", stroke: `${themecolors.darkgreen}`}, 
                                        ticks: {fill: "none", stroke: `${themecolors.darkgreen}`},
                                        values: {fill: `${themecolors.darkgreen}`, stroke: "none"}}}
                        hideTimeAxis={true}
                        style={{"position": "relative", "top": "-24px", "z-index": "0"}}
                    > 
                        <ChartRow 
                            height={abovemd ? "100" : "70"}
                            debug={false}>
                            <Brush
                                timeRange={timerange}
                                allowSelectionClear={true}
                                onTimeRangeChanged={props.handleTimeRangeChange}
                                style={{fill: "white", stroke: "none"}}
                            />
                            <YAxis
                                id="axis1"
                                //label="Totals"
                                min={0}
                                max={maxHeight}
                                width={50}
                                type="linear"
                                format="d"
                                visible={false}
                            />
                            <Charts>
                                <BarChart
                                    axis="axis1"
                                    columns={channelNames.slice(0).reverse()} // matches alignment of top
                                    style={style}
                                    series={totalseries}
                                    minBarHeight={0}
                                />
                            </Charts>
                        </ChartRow>
                    </ChartContainer>
                    :
                    <div />
                }
            </Resizable>
        </Paper>
    );
};

export default withStyles(styles, { withTheme: true })(BrushChart); 
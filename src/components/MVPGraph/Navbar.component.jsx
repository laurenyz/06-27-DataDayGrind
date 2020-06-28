import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import TimelineIcon from '@material-ui/icons/Timeline';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      }
    }));

function Navbar(){
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static"> 
                <Toolbar>
                    <TimelineIcon style={{marginRight: "5px"}} />
                    <Typography>CovidTracer</Typography>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Typography>www.covidtracer.tech</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
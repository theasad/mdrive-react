import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // height: 'calc(100vh - 70px)'
    },
    progress: {
        color: '#fff'
    }
}))

const Loader = () => {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }

        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <React.Fragment>
            <Grid>
                <div className={classes.loader}>
                    <CircularProgress size={30} variant="determinate" value={progress} className={classes.progress} />
                </div>
            </Grid>
        </React.Fragment>
    );
}

export default Loader
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '../routes'
import Loader from '../components/Loader'
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    }
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    const loadigRender = () => {
        if (props.isLoading) {
            return <Loader />
        }
    }
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link route="home"><a className={classes.link}>mDrive</a></Link>
                    </Typography>
                    {loadigRender()}
                </Toolbar>
            </AppBar>
        </div>
    );
}

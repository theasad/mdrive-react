import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from '../routes'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5
    },
    paper: {
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.text.secondary,
        textDecoration: 'none'
    }
}));


function getBreadCrumItems(breadCrumItems, classes) {
    if (breadCrumItems.hasOwnProperty("parents")) {
        return breadCrumItems.parents.map(item => {
            return (
                <Link key={item.slug} route='folder' params={{ slug: item.slug }}>
                    <a className={classes.link}>
                        {item.name}
                    </a>
                </Link>
            )

        })
    }

}

function activeBreadCrumItem(breadCrumItems) {
    if (breadCrumItems.hasOwnProperty('active')) {
        return <Typography color="textPrimary">{breadCrumItems.active.name}</Typography>
    }
}


export default function CustomSeparator(props) {
    const classes = useStyles();
    const { breadCrumItems } = props

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Breadcrumbs maxItems={3} separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
                    <Link route='home'>
                        <a className={classes.link}>
                            Home
                    </a>
                    </Link>
                    {getBreadCrumItems(breadCrumItems, classes)}
                    {activeBreadCrumItem(breadCrumItems)}
                </Breadcrumbs>
            </Paper>
        </div>
    );
}

import React from 'react'
import { Button, Box, Grid, GridList, GridListTile, Paper, withStyles, makeStyles } from '@material-ui/core';
import Folder from '../components/Folder'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    paper: {
        textAlign: 'left',
    },
    gridItem: {
        margin: theme.spacing(0.75),
        padding: 0 + '!important',
        minWidth: 162
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 'calc(100vh - 70px)'
    }
}));

function Folders(props) {

    const { folders } = props;
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={1}>
            {
                folders.map(folder => {
                    return <Grid item key={folder.slug} className={classes.gridItem}>
                        <Paper className={classes.paper}>
                            <Folder classes={classes} folder={folder} onFolderClick={props.onFolderClick} />
                        </Paper>
                    </Grid>
                })
            }

        </Grid>
    )


}

export default Folders
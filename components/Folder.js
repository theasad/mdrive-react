import React from 'react'
import { Link } from '../routes'
import { makeStyles } from '@material-ui/core/styles';
import { Folder as FolderIcon } from '@material-ui/icons'
import  grey from '@material-ui/core/colors/grey'

export default function Folder(props) {
    const useStyles = makeStyles(theme => ({
        folder: {
            padding: theme.spacing(2),
            backgroundColor:  grey[50],
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            color: props.folder.color?props.folder.color: grey[900],
            transition: 'all 0.3s ease-out',
            borderRadius: 4,
            '&:hover': {
                backgroundColor: props.folder.color?props.folder.color: grey[900],
                color: grey[50],
            }
        },
        driveFolderIcon: {
            marginRight: theme.spacing(.50)
        }
    }));
    const classes = useStyles();
    return <Link route='folder' params={{ slug: props.folder.slug }}>
        <a className={classes.folder} onClick={props.onFolderClick}>
            <FolderIcon className={classes.driveFolderIcon} /> <span>{props.folder.name}</span>
        </a>
    </Link>

};
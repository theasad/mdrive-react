// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import FolderIcon from '@material-ui/icons/Folder';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Moment from 'react-moment';
// import 'moment-timezone';

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         maxWidth: 752,
//     },
//     demo: {
//         backgroundColor: theme.palette.background.paper,
//     },
//     title: {
//         margin: theme.spacing(4, 0, 2),
//     },
// }));


// export default function Files(props) {
//     const classes = useStyles();
//     const [dense, setDense] = React.useState(false);
//     const [secondary, setSecondary] = React.useState(false);
//     const { files } = props



//     return (
//         <div className={classes.root}>
//             <Grid item xs={12}>
//                 <Typography variant="h6" className={classes.title}>
//                     Files
//                 </Typography>
//                 <div className={classes.demo}>
//                     <List dense={dense}>
//                         {files.map(file => {
//                             return (
//                                 <ListItem>
//                                     <ListItemAvatar >
//                                         <Avatar style={{ borderRadius: 0, backgroundColor: 'transparent' }}>
//                                             <img src={file.icon} alt={file.name} />
//                                         </Avatar>
//                                     </ListItemAvatar>
//                                     <ListItemText
//                                         primary={file.name}
//                                         secondary={<Moment format="DD MMMM, YYYY HH:mm">
//                                             {file.created}
//                                         </Moment>}
//                                     />
//                                     <ListItemSecondaryAction>
//                                         <IconButton edge="end" aria-label="Delete">
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </ListItemSecondaryAction>
//                                 </ListItem>
//                             )
//                         })}
//                     </List>
//                 </div>
//             </Grid>
//         </div>
//     );
// }



import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import { Avatar, Toolbar, Tooltip, IconButton, Link, ListItemText } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Router } from '../routes'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650
    },

    fileRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    avartar: {
        borderRadius: 0,
        backgroundColor: 'transparent',
        margin: theme.spacing(1)
    },
    image: {
        maxWidth: '100%',
        height: 'auto'
    },
    tableToolBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    tableCell: {
        padding: "0 5px"
    }
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function Files(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    const classes = useStyles();
    const { orderBy, direction } = props;
    let updateDirection = direction === 'desc' ? 'asc' : 'desc'
    const createSortHandler = (property, order) => event => {


        updateDirection = typeof order === "undefined" ? updateDirection : order;
        const updateRouteQuery = { slug: props.folder.slug, orderBy: property, direction: updateDirection }
        if (typeof props.folder.slug !== "undefined") {
            Router.pushRoute('folder', updateRouteQuery);
        } else {
            Router.pushRoute('home', updateRouteQuery);
        }
        if (typeof order !== "undefined") {
            setAnchorEl(null);
        }
    };



    return (
        <Paper className={classes.root}>
            <Toolbar className={classes.tableToolBar}>
                <Tooltip title="Filter list">
                    <IconButton onClick={handleClick} aria-label="Filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>

            <div>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <StyledMenuItem onClick={createSortHandler('name', 'asc')}>
                        <ListItemText primary="Sorting by name asc order" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createSortHandler('name', 'desc')}>
                        <ListItemText primary="Sorting by name desc order" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createSortHandler('created', 'asc')}>
                        <ListItemText primary="Sorting by uploaded date asc order" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={createSortHandler('created', 'desc')}>
                        <ListItemText primary="Sorting by uploaded date desc order" />
                    </StyledMenuItem>
                </StyledMenu>
            </div>

            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sortDirection={orderBy === 'name' ? direction : false}>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={direction}
                                onClick={createSortHandler('name', orderBy !== 'name' ? 'asc' : updateDirection)}>
                                File Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">File Size</TableCell>
                        <TableCell align="center" sortDirection={orderBy === 'created' ? direction : false}>
                            <TableSortLabel
                                active={orderBy === 'created'}
                                direction={direction}
                                onClick={createSortHandler('created', orderBy !== 'created' ? 'asc' : updateDirection)}>
                                Uploaded At
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.files.map((file, i) => (
                        <TableRow key={i} hover>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                                <div className={classes.fileRoot}>
                                    <Avatar className={classes.avartar}>
                                        <img alt={file.name} src={file.icon} className={classes.image} />
                                    </Avatar>
                                    <Link target="_blank" href={file.file} color="textPrimary">
                                        {file.name}
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell className={classes.tableCell} align="center">{file.size}</TableCell>
                            <TableCell className={classes.tableCell} align="center">
                                <Moment format="MMM DD, YYYY h:mm A">
                                    {file.created}
                                </Moment>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}


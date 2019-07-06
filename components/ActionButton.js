import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { CreateNewFolderOutlined as FolderCreateIcon, CloudUploadOutlined as FileUploadIcon } from '@material-ui/icons';
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    root: {
        height: 380,
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3)
    },
});

const actions = [
    { icon: <FolderCreateIcon />, name: 'Create New Folder', code: 'folder' },
    { icon: <FileUploadIcon />, name: 'Upload New File', code: 'file' }
];

class SpeedDialTooltipOpen extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isDisableFileUpload: !this.props.folder.hasOwnProperty('id'),
            open: false,
            uploading: false,
            files: [],
            folder: this.props.folder.hasOwnProperty('id') ? this.props.folder.id : '',
            slug: this.props.folder.hasOwnProperty('slug') ? this.props.folder.slug : '',
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.folder.hasOwnProperty('id') && nextProps.folder.id !== this.props.folder.id) {
            this.setState({
                ...this.state,
                isDisableFileUpload: false,
                folder: nextProps.folder.id,
                slug: nextProps.folder.slug
            })
        } else if (!nextProps.folder.hasOwnProperty('id')) {
            this.setState({
                ...this.state,
                isDisableFileUpload: true,
                folder: '',
                slug: ''
            })
        }
    }


    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    handleItemClick = (code) => {
        if (code === 'folder') {
            this.props.addFolderModalHandler();
        } else {
            this.upload.click();
        }
    };

    handleOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    upload_handleChange = (event) => {
        this._isMounted = true;
        const files = Array.from(event.target.files);
        if (files.length) {
            this.setState({ uploading: true });
            files.forEach((file, i) => {
                const formData = new FormData();
                formData.append('folder', this.state.folder);
                formData.append('file', file);
                this.props.handleFileUploadForm(formData, file.name)
            });
            this._isMounted = false;

        } else {
            this.setState({
                uploading: false,
                files: []
            });
        }
    };


    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div className={classes.root}>
                <TextField
                    inputRef={(ref) => this.upload = ref}
                    error={false}
                    style={{ display: 'none' }}
                    onChange={this.upload_handleChange} autoFocus
                    id="file-upload" label="Upload File"
                    inputProps={{ 'multiple': true }}
                    type="file" fullWidth />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.speedDial}
                    icon={<SpeedDialIcon />}
                    onBlur={this.handleClose}
                    onClick={this.handleClick}
                    onClose={this.handleClose}
                    onFocus={this.handleOpen}
                    onMouseEnter={this.handleOpen}
                    onMouseLeave={this.handleClose}
                    open={open}>
                    {actions.map(action => (
                        <SpeedDialAction
                            // disabled={action.code === 'file' ? this.state.isDisableFileUpload : false}
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => this.handleItemClick(action.code)}
                        />
                    ))}
                </SpeedDial>


            </div>
        );
    }
}

SpeedDialTooltipOpen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpeedDialTooltipOpen);

import React from 'react';
import { Grid, Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from "../routes"
class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    }


    errorRender = () => {
        if (this.props.statusCode && this.props.statusCode == 404) {
            return <React.Fragment><strong>404</strong> Page not found.</React.Fragment>
        } else if (this.props.statusCode) {
            return `An error <strong>${this.props.statusCode}</strong> occurred on server`
        } else {
            return 'An error occurred on client'
        }
    }

    render() {
        return (
            <Grid container spacing={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid item style={{ marginTop: '3rem', display:'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" component="h4">
                        {this.errorRender()}
                    </Typography>
                    <Link component={RouterLink} style={{ marginLeft: '3rem' }} to="/"><a>Go Back</a></Link>
                </Grid>
            </Grid>
        );
    }
}

export default Error;
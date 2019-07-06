import React, { Fragment } from 'react'
import Header from './Header'
import { Container, CssBaseline, withStyles } from '@material-ui/core';
import Breadcrumbs from '../components/Breadcrumbs'

const useStyles = theme => ({
    innerContainer: {
        marginTop: '5rem'
    }
});

class Layout extends React.Component {

    renderBreadcrumbs() {
        if (this.props.hasOwnProperty('breadCrumItems'))
            return <Breadcrumbs breadCrumItems={this.props.breadCrumItems} />
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CssBaseline />
                <Container maxWidth="lg" >
                    <Header isLoading={this.props.isLoading} classes={classes} />
                    <div className={classes.innerContainer}>
                        {this.renderBreadcrumbs()}
                        {this.props.children}
                    </div>
                </Container>
            </Fragment>
        )
    }
}

export default withStyles(useStyles)(Layout)
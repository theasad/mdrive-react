import React from 'react'
import { withRouter } from 'next/router';
import Layout from '../components/Layout.js';

class Drive extends React.Component {
    static async getInitialProps({ req }) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        return { userAgent };
    }

    render() {
        return <div>Hello World {this.props.userAgent}</div>;
    }
}

export default withRouter(Drive)
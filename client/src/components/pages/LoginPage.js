import React from "react";
import { Grid, Row, Col, Image, Button} from "react-bootstrap";
import { Redirect } from "react-router";
import history from './history';

export default class LoginPage extends React.Component {

    state = {
        authenticated: false,
    }

    authentication = () => {
        this.authenticate()
                .then(res => {
                    this.checkAuthenticated()
                        .then(res1 => {
                        })
                        .catch(err1 => console.log(err1));
                })
                .catch(err => console.log(err));
    }

    authenticate = async () => {
        const response = await fetch('/api/authenticate', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        const body = await response.json();
        return body;
    };

    checkAuthenticated = async () => {
        const response = await fetch('/api/check_auth', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        const body = await response.json();
        console.log(body.auth)
        // if (body.auth == 'True') {
        //     this.setState({ authenticated: true });
        // }
        return body;
    };

    get linkedInLogo() {
        return <Image className="padding-50" src="./linkedin_logo.png" rounded />
    }

    get loginButton () {
        return <Button className="blue" onClick={this.authentication} bsSize="large" block>
                Sign In With LinkedIn
            </Button>
    }
    
    render() {
        // if (this.state.authenticated) {
        //     return <Redirect to='/register' push/>
        // }

        return (
            <div className="App black full-page">
                <header className="App-header">
                    <h1 className="App-title">LinkedIn Autoconnect</h1>
                </header>
                <Grid >
                    <Row className="show-grid">
                        <Col lg={6} md={4.5} sm={4} xs={3} className="col-centered">
                            {this.linkedInLogo}
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        {this.loginButton}
                    </Row>
                </Grid>
            </div>
        )
    }
}
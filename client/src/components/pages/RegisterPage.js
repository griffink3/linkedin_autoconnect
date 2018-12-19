import React from "react";
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import debounce from 'lodash/debounce';

const pwMinLen = 6;

export default class RegisterPage extends React.Component {

    state = {
        name: "",
        email: "",
        password: "",
        bio: "",
        gender: "Woman",
        genderWanted: "Woman",
        authenticated: false,
        userExists: false,
    }

    handleNameInput = (e) =>
        this.setState({ name: e.target.value });

    handleEmailInput = (e) => {
        this.setState({ email: e.target.value, errorMessage: "" });
        this.handleValidation(e.target.value, this.state.password)
    }

    handlePasswordInput = (e) => {
        this.setState({ password: e.target.value, errorMessage: "" });
        this.handleValidation(this.state.email, e.target.value);
    }

    handleValidation = debounce((email, password) => {
        if (email.includes('@') && password.length >= pwMinLen) {
            this.checkUserExists()
                .then(res => {
                    if (res.exists == 'Yes') {
                        this.setState({ authenticated: false });
                        this.setState({ userExists: true });
                    } else {
                        this.setState({ authenticated: true });
                        this.setState({ userExists: false });
                    }
                })
                .catch(err => console.log(err));
        } else {
            this.setState({ authenticated: false });
        }
      }, 500)

    handleGenderSelect = (e) =>
        this.setState({gender: e.target.value});
    
    handleGenderWantedSelect = (e) =>
        this.setState({genderWanted: e.target.value});
    
    handleBioInput = (e) =>
        this.setState({bio: e.target.value});

    emailValidityClass () {
        if (this.state.email.includes('@')) {
            return "green-outline";
        } else {
            return "red-outline";
        }
    } 

    passwordValidityClass () {
        if (this.state.password.length >= pwMinLen) {
            return "green-outline";
        } else {
            return "red-outline";
        }
    }

    handleSubmit = () => {
        if (this.state.userExists) {
            this.setState({ errorMessage: "This email is already associated with an account" });
        } else if (!this.state.authenticated) {
            this.setState({ errorMessage: "Please enter a valid email and password" });
        } else {
            this.props.updateName(this.state.name);
            this.props.updateEmail(this.state.email);
            this.props.updatePassword(this.state.password);
            this.props.updateBio(this.state.bio);
            this.props.updateGender(this.state.gender);
            this.props.updateGenderWanted(this.state.genderWanted);
            this.sendUserInfo()
                .then(res => {console.log(res.confirmation)})
                .catch(err => console.log(err));
        }
    }

    checkUserExists = async () => {
        const response = await fetch('/api/check_user_exists', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
              })
          });
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
    };

    sendUserInfo = async () => {
        const response = await fetch('/api/create_user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                bio: this.state.bio,
                gender: this.state.gender,
                genderWanted: this.state.genderWanted,
              })
          });
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
    };

    get registerButton () {
        return <Button onClick={this.handleSubmit} bsStyle="primary" bsSize="large" block>
                Create Profile
            </Button>    
    }

    render = () =>
        <div className="pink full-page">
            <header className="page-header">
                <h1 className="page-title">Create a New Profile</h1>
            </header>
            <Grid >
                <Form horizontal className="full-width padding-50">
                    <FormGroup controlId="loginFormName">
                        <Row className="show-grid">
                            <Col componentClass={ControlLabel} lg={4}>
                                What's your name?
                            </Col>
                            <Col lg={6}>
                                <FormControl 
                                    onChange={this.handleNameInput} 
                                    type="text" 
                                    placeholder="Name" 
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId="loginFormEmail">
                        <Row className="show-grid">
                            <Col componentClass={ControlLabel} lg={4}>
                                What's your email?
                            </Col>
                            <Col lg={6}>
                                <FormControl 
                                    className={this.emailValidityClass()} 
                                    onChange={this.handleEmailInput} 
                                    type="text" 
                                    placeholder="Email" 
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId="loginFormPassword">
                        <Row className="show-grid">
                            <Col componentClass={ControlLabel} lg={4}>
                                What's your password?
                            </Col>
                            <Col lg={6}>
                                <FormControl 
                                    className={this.passwordValidityClass()} 
                                    onChange={this.handlePasswordInput} 
                                    type="text" 
                                    placeholder="Password" 
                                    />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId="loginFormGender">
                        <Row className="show-grid">
                            <Col componentClass={ControlLabel} lg={4}>
                                What's your gender?
                            </Col>
                            <Col lg={6}>
                                <FormControl onChange={this.handleGenderSelect} componentClass="select" placeholder="Woman">
                                    <option value="Woman">Woman</option>
                                    <option value="Man">Man</option>
                                    <option value="Other">Other</option>
                                </FormControl>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId="loginFormGenderWanted">
                        <Row className="show-grid">
                            <Col componentClass={ControlLabel} lg={4}>
                                Who are you looking for?
                            </Col>
                            <Col lg={6}>
                                <FormControl onChange={this.handleGenderWantedSelect} componentClass="select" placeholder="Woman">
                                    <option value="Woman">Woman</option>
                                    <option value="Man">Man</option>
                                    <option value="Other">Other</option>
                                </FormControl>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId="loginFormBio">
                        <Row className="show-grid">
                            <Col componentClass={ControlLabel} lg={4}>
                                Say a few words about yourself...
                            </Col>
                            <Col lg={6}>
                                <FormControl onChange={this.handleBioInput} componentClass="textarea" placeholder="Your Bio" />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className="error-message">{this.state.errorMessage}</ControlLabel>
                    </FormGroup>
                    <input type="file" onChange={this.fileChangedHandler}></input>
                </Form>
                <Row className="show-grid">
                    <Col lg={6}>
                    </Col>
                    <Col lg={6}>
                        {this.registerButton}
                    </Col>
                </Row>
            </Grid>
        </div>
}
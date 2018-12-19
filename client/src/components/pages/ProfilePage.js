import React from "react";
import { Grid, Row, Image, Button} from "react-bootstrap";
import PropTypes from 'prop-types'

export default class ProfilePage extends React.Component {

    state = {
        name: " ",
        image: null,
        // email: this.props.email,
        // password: this.props.password,
        // bio: this.props.bio,
        // gender: this.props.gender,
        // genderWanted: this.props.genderWanted,
        // response: "",
    }

    static propTypes = {
        // name: PropTypes.string.isRequired,
        // email: PropTypes.string.isRequired,
        // password: PropTypes.string.isRequired,
        // bio: PropTypes.string.isRequired,
        // gender: PropTypes.string.isRequired,
        // genderWanted: PropTypes.string.isRequired,
    } 

    componentDidMount() {
        this.getInfo()
                .then(res => {
                })
                .catch(err => console.log(err));
    }

    sendApiRequest = () => {
        this.getConnections()
                .then(res => {
                })
                .catch(err => console.log(err));
    }

    // // Making an api call to test that it works
    getInfo = async () => {
        const response = await fetch('/api/get_info', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        const body = await response.json();
        this.setState({ name: body.firstName + ' ' + body.lastName, image: body.prof_pic });
        console.log(body.prof_pic);
        return body;
    };

    getConnections = async () => {
        const response = await fetch('/api/get_connections', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        const body = await response.json();
        console.log(body);
        return body;
    };

    get button () {
        return <Button className="blue" onClick={this.sendApiRequest} bsSize="large" block>
                Send API Request
            </Button>
    }

    get profilePicture() {
        return <Image className="padding-50" src={this.state.image} rounded />
    }

    render () {
        return(<div className="blue full-page">
            <header className="page-header">
                <h1 className="page-title">{this.state.name}</h1>
            </header>
            {/* <div>{this.state.email}</div>
            <div>{this.state.password}</div>
            <div>{this.state.bio}</div>
            <div>{this.state.gender}</div>
            <div>{this.state.genderWanted}</div>
            <div>{this.state.response}</div> */}
            <Grid >
                <Row className="show-grid">
                        {this.button}
                </Row>
                {this.profilePicture}
            </Grid>
        </div>);
    }
        
}

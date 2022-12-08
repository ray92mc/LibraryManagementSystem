import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, Form, Button, Alert} from 'react-bootstrap';
import {} from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';
import {authenticateUser} from '../services/index';

class LoginComponent extends Component {

    constructor(props){
        super(props);
        this.state = this.initialState;
    };

    initialState = {
        email:'', password:'', error:''
    };

    resetLoginForm = () => {
        this.setState(() => this.initialState);
    };

    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    validateUser = () => {
        this.props.authenticateUser(this.state.email, this.state.password);
        setTimeout(() => {
            if(this.props.auth.isLoggedIn){
                return this.props.history.push("/");
            } else {
                this.resetLoginForm();
                this.setState({"error":"Invalid credentials"});
            }
        }, 500);
    };

    render() {
        const {email, password, error} = this.state;
        return (
            <>
            {error && <Alert variant='danger' style={{margin:"20px"}}>{error}</Alert>}
            <Card className={"border border-dark bg-dark text-white"} style={{margin:"20px"}}>
                <Card.Header>Login</Card.Header>
                <Form id="loginFormId">
                    <Card.Body>
                        <Row>
                        <Col>
                        <Form.Group controlId='formGridEmail'>
                            <Form.Label style={{margin:"5px"}}>Email</Form.Label>
                            <Form.Control name="email" required type="text" className={"bg-dark text-white"} value={email} onChange={this.credentialChange} placeholder="Enter Email"></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId='formGridPassword'>
                            <Form.Label style={{margin:"5px"}}>Password</Form.Label>
                            <Form.Control name="password" required type="password" className={"bg-dark text-white"} value={password} onChange={this.credentialChange} placeholder="Enter Password"></Form.Control>
                        </Form.Group>
                        </Col> 
                        </Row>   
                    </Card.Body> 
                    <Card.Footer style={{textAlign:"right"}}>
                        <Button size="sm" variant="success" type="submit" onClick={this.validateUser} disabled={this.state.email.length===0 || this.state.password.length===0}>Submit</Button>  
                    </Card.Footer>
                    </Form>
            </Card>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth:state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
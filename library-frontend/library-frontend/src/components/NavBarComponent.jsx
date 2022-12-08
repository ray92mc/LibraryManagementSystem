import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {logoutUser} from '../services/index';

class NavBarComponent extends Component {
    logout = () => {
        this.props.logoutUser();
    };
    
    render() {

        const guestLinks=(
            <>
                <Nav className="navbar-right">
                    <Link to={"register"} className='nav-link'><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                    <Link to={'login'} className='nav-link'><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                </Nav>
            </>
        );

        const userLinks = (
            <>
                <Nav className="mr-auto">
                    <Link to={"/books"} className='nav-link'>Books</Link>
                    <Link to={"/books/add"} className='nav-link'>Add Books</Link>
                    <Link to={"/logout"} className='nav-link' onClick={this.logout}>Logout</Link>
                </Nav>
            </>
        );

        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className='navbar-brand'>
                    Library
                </Link>
                {this.props.auth.isLoggedIn ? userLinks : guestLinks}
                
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return{
        logoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);

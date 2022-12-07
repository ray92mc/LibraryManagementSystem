import React, { Component } from 'react';
import {Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt} from '@fortawesome/free-solid-svg-icons';

class NavBarComponent extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className='navbar-brand'>
                    Library
                </Link>
                <Nav className="mr-auto">
                    <Link to={"/books"} className='nav-link'>Books</Link>
                    <Link to={"/books/add"} className='nav-link'>Add Books</Link>
                </Nav>
                <Nav className="navbar-right">
                    <Link to={"register"} className='nav-link'><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                    <Link to={'login'} className='nav-link'><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBarComponent;

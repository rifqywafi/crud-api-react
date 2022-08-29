import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

function Header(){
    return(
    <div className='Header'>
        <Navbar bg="dark" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand className="my-auto" href="https://reactjs.org" target="_blank">
                    <img src={logo} className="App-logo" alt="logo"></img>
                    <a className="Font">React</a>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" to="\">Home</Link>
                    <Link className="nav-link" to="/book">Book</Link>
                    <Link className="nav-link" to="/product">Product</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                </Nav>
            </Container>
      </Navbar>
    </div>
    )
}

export default Header;
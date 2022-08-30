import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Header(){
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    
    const logout = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://localhost:8000/api/auth/logout')
        .then(() => {
            localStorage.removeItem("token");
            navigate('/login');
        })
    }

    return(
    <div className='Header'>
        <Navbar bg="dark" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand className="my-auto" href="https://reactjs.org" target="_blank">
                    <img src={logo} className="App-logo" alt="logo"></img>
                    <a className="Font">React</a>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" to="/home">Home</Link>
                    <Link className="nav-link" to="/book">Book</Link>
                    <Link className="nav-link" to="/product">Product</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                    <Nav.Link className="nav-link" onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Container>
      </Navbar>
    </div>
    )
}

export default Header;
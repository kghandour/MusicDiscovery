import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import logo from '../res/Asset 1.svg';


export const Navigation = (props) =>{
    return(
        <Navbar expand="xs" className="nav-bar-custom navbar-dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Item>
                    Hello World
                </Nav.Item>
            </Navbar.Collapse>
            <div className="logo-center">
                <img
                    src={logo}
                    alt="music discover"
                    width="120"
                />
            </div>
        </Navbar>
    )
}
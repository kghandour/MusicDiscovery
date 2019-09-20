import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {signOut} from '../Helper/Data'

export const Navigation = props=>{
    return(
        <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" sticky="top">
            <Navbar.Brand href="#home">
            <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
            Spotify Suggestions
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {
            props.user !== undefined && props.user.display_name!== '' && (
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav.Link href={props.user.external_urls.spotify} target="_blank">
                {props.user.display_name.split(" ")[0]}
            </Nav.Link>
            <Nav.Link onClick={signOut}>Sign out</Nav.Link>
            </Navbar.Collapse>
            )
            
        }
        
    </Navbar>
    );
};

export const Footer = props =>{
    return(
        (props.user !== undefined && props.user.display_name!== '') ?
        (<Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>) :
        (<Navbar bg="dark" variant="dark" fixed="bottom">
            <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>)
    );
}
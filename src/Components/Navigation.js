import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {signOut, authUser} from '../Helper/Data'

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
            
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
        {
            (props.user !== undefined && props.user.display_name!== '') || props.userError!=="" ? (
            <Nav>
            <Nav.Link href={props.user.external_urls.spotify} target="_blank" className="greenNavButton">
                <b>{props.user.display_name.split(" ")[0]}</b>
            </Nav.Link>
            <Nav.Link onClick={signOut}>Sign out</Nav.Link>
            </Nav>
            ):
            <Nav>
            <Nav.Link onClick={authUser}>Login</Nav.Link>
            </Nav>
        }
            </Navbar.Collapse>
            

        
    </Navbar>
    );
};

const FooterItems = props=>{
    return(
        <Nav md="auto">
            <Nav.Item>
                Suggestions For Spotify is an open-source project developed by <a href="https://kghandour.com">Karim ElGhandour</a>
            </Nav.Item>
        </Nav>
    );
}

export const Footer = props =>{
    return(
        <Navbar bg="dark" variant="dark" className="justify-content-md-center footer">
            <FooterItems/>
        </Navbar>
    );
}
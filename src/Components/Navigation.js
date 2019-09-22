import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {signOut, authUser} from '../Helper/Data';
import authentication from '../config/authentication';

export const Navigation = props=>{
    return(
        <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" sticky="top">
            <Navbar.Brand>
            <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
            Suggestions For Spotify - <button style={{backgroundColor:'green', color: 'white', border: 'none', cursor: 'default'}}>BETA</button>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
        {
            (props.user !== undefined && props.user.display_name!== '') || props.userError!=="" ? (
            <Nav>
            <Nav.Link href={"mailto:"+authentication.feedbackEmail+"?subject=[Feedback]"+authentication.title} target="_blank">Send Feedback</Nav.Link>
            <Nav.Link href={props.user.external_urls.spotify} target="_blank" className="greenNavButton">
                <b>{props.user.display_name.split(" ")[0]}</b>
            </Nav.Link>
            <Nav.Link onClick={signOut}>Sign out</Nav.Link>
            </Nav>
            ):
            <Nav>
            <Nav.Link href={"mailto:"+authentication.feedbackEmail+"?subject=[Feedback]"+authentication.title} target="_blank">Send Feedback</Nav.Link>
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
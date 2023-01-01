import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../res/Asset 1.svg';
import {signOut} from '../Helper/Data';

export const Navigation = (props) => {
    return (
        <Navbar expand="xs" className="nav-bar-custom navbar-dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link href={"mailto:" + process.env.REACT_APP_FEEDBACKEMAIL + "?subject=[Feedback]" + process.env.REACT_APP_TITLE} target="_blank">
                    Send Feedback
                </Nav.Link>
                <Nav.Link href={"mailto:" + process.env.REACT_APP_BUGSEMAIL + "?subject=[Bug]" + process.env.REACT_APP_TITLE} target="_blank">
                    Report a Bug
                </Nav.Link>
                <Nav.Link onClick={signOut}>
                    Sign out
                </Nav.Link>
            </Navbar.Collapse>
            <div className="logo-center">
                <img
                    src={logo}
                    alt="music discover"
                    width="120"
                />
            </div>
        </Navbar >
    )
}
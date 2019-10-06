import React from 'react'
import logo from '../res/Asset 1.svg';
import spotifyWhite from '../res/spotify_white.png';
import {Button, Container } from 'react-bootstrap';
import { authUser } from '../Helper/Data';
export const NotLoggedIn = props => {
    const isLoggedIn = props.isLoggedIn;
    return (
        <Container className="center-div">
            <h1>{isLoggedIn}</h1>
            <img src={logo} alt="music discovery" className="large-logo mb-50" /> <br />
            <Button variant="outline-light" className="authorize-spotify-btn mb-50" onClick={authUser}>Authorize Spotify <img src={spotifyWhite} alt="" width="18px" /></Button> <br />
            <p className="subtitle-76">
                music discovery uses Spotify API to provide recommendations for you based on your taste.
                </p>
            <p>
                No login credentials are accessible by music discovery
            </p>
        </Container>
    )

}
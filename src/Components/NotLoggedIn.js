import React from 'react';
import {authUser} from '../Helper/Data';
import {Jumbotron, Accordion, Card, Button} from 'react-bootstrap';

export const NotLoggedIn = props =>{
    return(
        <div>
        <Jumbotron>
          <h1>Suggestions For Spotify</h1>
          <p>
            For all music enthusiasts! Use your Spotify library to discover new songs daily!
          </p>
          New algorithms and criteria are provided with new ones on the way to fit all your moods.
          <p>
            <Button variant="success" onClick={authUser}>Login to Spotify</Button>
          </p>
        </Jumbotron>
        <Accordion>
        <Card >
        <Accordion.Toggle as={Card.Header} eventKey="0">
        Permissions required
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        "user-top-read":<br />
        Retrieves the user top liked tracks. It is one of the algorithms used to provide recommendations. <br />
        "user-library-read": <br />
        Retrieves the user saved tracks.  <br />
        "user-read-recently-played"<br />
        Retrieves the list of recently played tracks.<br />
        </Card.Body>
        </Accordion.Collapse>
        </Card>
        </Accordion>
        </div>
    );
}
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
          <h6>
          New algorithms and criteria are provided with new ones on the way to fit all your moods.
          </h6>
          <p>
            <Button variant="success" onClick={authUser}>Authorize Spotify</Button>
          </p>
          <span>The official Spotify API is used. <b>We do NOT have access to your private information.</b> <br />
          Once you press the button, you will be redirected to the official Spotify Website to login. Again, we can <b>NOT</b> see your password.<br /></span>
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
import React from 'react'
import {Card, Accordion, Button} from 'react-bootstrap'

export const TopTracks = props => {
    const tracks = props.topTracks.items;
    const listTracks = tracks.map((track)=>
        <li key={track.id}><a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">{track.name} - {track.artists[0].name}</a></li>
    );
    return(
        <Accordion>
        <Card >
        <Accordion.Toggle as={Card.Header} eventKey="0">
        <h4>{props.title}</h4>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        <ol>{listTracks}</ol>
        </Card.Body>
        </Accordion.Collapse>
        </Card>
        </Accordion>
    );
}

export const RecentlyPlayed = props => {
    const tracks = props.topTracks.items;
    const listTracks = tracks.map((track, index)=>
        <li key={track.track.id+index}><a href={track.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">{track.track.name} - {track.track.artists[0].name}</a></li>
    );
    return(
        <Accordion>
        <Card >
        <Accordion.Toggle as={Card.Header} eventKey="0">
        <h4>{props.title}</h4>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
        <Card.Body>
        <ol>{listTracks}</ol>
        </Card.Body>
        </Accordion.Collapse>
        </Card>
        </Accordion>
    );
}
import React from 'react'
import {Card} from 'react-bootstrap'

export const TopTracks = props => {
    const tracks = props.topTracks.items;
    const listTracks = tracks.map((track)=>
        <li key={track.id}><a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">{track.name} - {track.artists[0].name}</a></li>
    );
    return(
        <Card >
        <Card.Body>
        <ol>{listTracks}</ol>
        </Card.Body>
        </Card>
    );
}

export const RecentlyPlayed = props => {
    const tracks = props.topTracks.items;
    const listTracks = tracks.map((track, index)=>
        <li key={track.track.id+index}><a href={track.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">{track.track.name} - {track.track.artists[0].name}</a></li>
    );
    return(
        <Card >
        <Card.Body>
        <ol>{listTracks}</ol>
        </Card.Body>
        </Card>
    );
}
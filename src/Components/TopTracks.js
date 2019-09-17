import React from 'react'
import {Card} from 'react-bootstrap'

const TopTracks = props => {
    const tracks = props.topTracks.items;
    const listTracks = tracks.map((track)=>
        <li key={track.id}>{track.name} - {track.artists[0].name}</li>
    );
    return(
        <Card >
        <Card.Body>
        <ol>{listTracks}</ol>
        </Card.Body>
        </Card>
    );
}
export default TopTracks;
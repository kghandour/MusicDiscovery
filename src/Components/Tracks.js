import React from 'react';
import { Card, Col, Row, Media } from 'react-bootstrap';

export const Tracks = (props) => {
    const tracks = [...props.recommendations.tracks].splice(0, 3);
    const tracks2 = [...props.recommendations.tracks].splice(3);
    const chosenTracks = [...props.chosenTracks];

    const listTracks = tracks.map((track) =>
        <Col xs={4} key={track.id} className="d-flex flex-column">
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <Card>
                    <Card.Img variant="top" src={track.album.images[1].url} alt="" />
                    <Card.Body >
                        <Card.Title>{track.name}</Card.Title>
                        <Card.Subtitle>{track.artists[0].name}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </a>
        </Col>
    );
    const listTracks2 = tracks2.map((track) =>
        <Media key={track.id} >
            <img
                width={64}
                height={64}
                className="mr-3"
                src={track.album.images[1].url}
                alt=""
            />
            <Media.Body>
                <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    <h5>{track.name}</h5>
                    <p>
                        {track.artists[0].name}
                    </p>
                </a>
            </Media.Body>
        </Media>
    );

    const chosenTracksList = chosenTracks.map((track, index)=>{
        if(track.track !== undefined)
            return <span className="chosenTrack" key={track.track.id}><a href={track.track.external_urls.spotify} target="_blank" rel="noopener noreferrer"><i>{track.track.name.split("(")[0].split("-")[0]}</i></a>{index < chosenTracks.length-1 && <span>,</span>}</span>
        else
            return <span className="chosenTrack" key={track.id}><a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer"><i>{track.name.split("(")[0].split("-")[0]}</i></a>{index < chosenTracks.length-1 && <span>,</span>}</span>
        }
    );

    return (
        <div>
            <Row className="listenedTo">
                Because you listened to:&nbsp;{chosenTracksList}
            </Row>
            <Row>
                {listTracks}<br />
            </Row>
            {listTracks2}
        </div>

    )
}
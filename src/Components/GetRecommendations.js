import React from 'react'
import {Media, Card, Button,Col, Row, Image} from 'react-bootstrap'
import spotifyImage from '../Spotify_Icon_RGB_White.png'
export const GetRecommendations = props =>{
    const tracks = [...props.recommendations.tracks].splice(0,3);
    const tracks2 = [...props.recommendations.tracks].splice(3,);
    const listTracks = tracks.map((track, index)=>
  <Col key={track.id}>
  <Card style={{ width: '18rem' }} className="recommendationCard">
        <Card.Img variant="top" src={track.album.images[1].url} />
        <Card.Body>
          <Card.Title>{index + 1}. {track.name}</Card.Title>
          <Card.Subtitle>{track.artists[0].name}</Card.Subtitle>
          <Button variant="success" href={track.external_urls.spotify} target="_blank" className="playButton">Play on Spotify</Button>
        </Card.Body>
      </Card>
      </Col>
    );

    const listTracks2 = tracks2.map((track, index)=>
    
    <Col key={track.id} lg={6} className="recommendedOther">
      <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
        <div className="listOther">
        {index+4}. {track.name} - {track.artists[0].name}
        <img src={spotifyImage} width="21px" style={{float:"right"}}/>
        </div>
      </a>
      </Col>
    );

    return(
        <Card >
        <Card.Body>
        <h4>Recommended Tracks:</h4>
        
        <Row>
        {/* <Carousel style={carouselStyle}> */}
        {listTracks}
        {listTracks2}
        </Row>
        {/* </Carousel> */}
        </Card.Body>
        </Card>
    );
}

export default GetRecommendations;
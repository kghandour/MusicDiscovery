import React from 'react'
import {Carousel, Card, Button,Col, Row} from 'react-bootstrap'
export const GetRecommendations = props =>{
    const tracks = props.recommendations.tracks.splice(0,3);
    const listTracks = tracks.map((track)=>
  //   <Carousel.Item key={track.id}>
  //       <img className="d-block w-100" src={track.album.images[0].url} alt={track.name}/>
  //   <Carousel.Caption>
  //     <h3><a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">{track.name} - {track.artists[0].name}</a></h3>
  //   </Carousel.Caption>
  // </Carousel.Item>
  <Col key={track.id}>
  <Card style={{ width: '18rem' }} >
        <Card.Img variant="top" src={track.album.images[1].url} />
        <Card.Body>
          <Card.Title>{track.name}</Card.Title>
          <Card.Subtitle>{track.artists[0].name}</Card.Subtitle>
          <Button variant="success">Play on Spotify</Button>
        </Card.Body>
      </Card>
      </Col>
    );

    const carouselStyle = {
        width: '450px',
        height: '450px',
        border: '5px solid green',
        margin: '0 auto'
      };

    return(
        <Card >
        <Card.Body>
        <h4>Recommended Tracks:</h4>
        
        <Row>
        {/* <Carousel style={carouselStyle}> */}
        {listTracks}
        </Row>
        {/* </Carousel> */}
        </Card.Body>
        </Card>
    );
}

export default GetRecommendations;
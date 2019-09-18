import React from 'react'
import {Carousel, Card} from 'react-bootstrap'
const GetRecommendations = props =>{
    const tracks = props.recommendations.tracks.slice(0,3);
    const listTracks = tracks.map((track)=>
    <Carousel.Item>
        <img className="d-block w-100" src={track.album.images[0].url}/>
    <Carousel.Caption>
      <h3><a href={track.uri}>{track.name} - {track.artists[0].name}</a></h3>
    </Carousel.Caption>
  </Carousel.Item>
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
        <Carousel style={carouselStyle}>
        {listTracks}
        </Carousel>
        </Card.Body>
        </Card>
    );
}

export default GetRecommendations;
import React from 'react'
import {Carousel, Card} from 'react-bootstrap'
export const GetRecommendations = props =>{
    const tracks = props.recommendations.tracks.slice(0,3);
    const listTracks = tracks.map((track)=>
    <Carousel.Item key={track.id}>
        <img className="d-block w-100" src={track.album.images[0].url} alt={track.name}/>
    <Carousel.Caption>
      <h3><a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">{track.name} - {track.artists[0].name}</a></h3>
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
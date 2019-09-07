import React from 'react'
const GetRecommendations = props =>{
    const tracks = props.recommendations.tracks;
    const listTracks = tracks.map((track)=>
        <li key={track.id}><a href={track.external_urls.spotify}>{track.name} - {track.artists[0].name}</a></li>
    );
    return(
        <ol>{listTracks}</ol>
    );
}

export default GetRecommendations;
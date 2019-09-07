import React from 'react'
const TopTracks = props => {
    const tracks = props.topTracks.items;
    const listTracks = tracks.map((track)=>
        <li key={track.id}>{track.name} - {track.artists[0].name}</li>
    );
    return(
        <ol>{listTracks}</ol>
    );
}
export default TopTracks;
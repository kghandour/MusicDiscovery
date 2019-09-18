import axios from 'axios';

export const  getUserInfo= async (token)=>{
    const user_info = localStorage.getItem('user_info');
    if(!user_info){
        const res = await axios.get(
            'https://api.spotify.com/v1/me' ,{headers: { Authorization: 'Bearer '+token}}
        )
        localStorage.setItem('user_info',JSON.stringify(res.data));
        return res.data;
    }else{
        return JSON.parse(user_info)
    }
}



export const getTopTracks= async (token)=>{
    const user_top_tracks = localStorage.getItem('user_top_tracks');
    var res;
    if(!user_top_tracks){
    res = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks' ,{headers: { Authorization: 'Bearer '+token}}
      )
    localStorage.setItem('user_top_tracks',JSON.stringify(res.data))
    return res.data;     
    }else{
      return JSON.parse(user_top_tracks)
    } 
}

export const getTopArtists = async (token) => {
  const res = await axios.get(
    'https://api.spotify.com/v1/me/top/artists' ,{headers: { Authorization: 'Bearer '+token}}
    );
    return res.data;
}

export const getRecommendations = async (token, topTracks)=>{
    const topTracksShuffled = shuffleArray(topTracks.items);
    const res = await axios.get(
      'https://api.spotify.com/v1/recommendations',{headers: { Authorization: 'Bearer '+token},
      params:{
      seed_tracks:topTracksShuffled[0].id+','+
      topTracksShuffled[1].id+','+
      topTracksShuffled[2].id+','+
      topTracksShuffled[3].id+','+
      topTracksShuffled[4].id
    }});

    return res.data;
}

function shuffleArray(array2) {
    const array = [...array2];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

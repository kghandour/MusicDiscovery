import axios from 'axios';
import API from '../config/API_endpoints.json'
import authentication from '../config/authentication'

export const  getUserInfo= async (token)=>{
    const user_info = localStorage.getItem('user_info');
    if(!user_info){
        const res = await axios.get(
            API.API_base + API.user_info ,{headers: { Authorization: 'Bearer '+token}}
        )
        localStorage.setItem('user_info',JSON.stringify(res.data));
        return res.data;
    }else{
        return JSON.parse(user_info)
    }
}

export function signOut(){
  localStorage.clear();
  window.location.reload();
}

export const getTopTracks= async (token)=>{
    const user_top_tracks = localStorage.getItem('user_top_tracks');
    var res;
    if(!user_top_tracks){
    res = await axios.get(
      API.API_base + API.top_tracks ,{headers: { Authorization: 'Bearer '+token}}
      )
    localStorage.setItem('user_top_tracks',JSON.stringify(res.data))
    return res.data;     
    }else{
      return JSON.parse(user_top_tracks)
    } 
}

export const getSavedTracks= async (token)=>{
  const res = await axios.get(
    API.API_base + API.saved_tracks ,{headers: { Authorization: 'Bearer '+token}}
    );
    return res.data;
}

export const getTopArtists = async (token) => {
  const res = await axios.get(
    API.API_base + API.top_artists ,{headers: { Authorization: 'Bearer '+token}}
    );
    return res.data;
}


export const getRecentlyPlayed = async (token) => {
    const res = await axios.get(
        API.API_base + API.recently_played ,{headers: { Authorization: 'Bearer '+token}}
      );
      res.data.items = res.data.items.filter((elem, index, self) => self.findIndex(
        (t) => {return (t.track.id === elem.track.id)}) === index)
      return res.data;
  }

export const getRecommendations = async (token, topTracks)=>{
    const topTracksShuffled = shuffleArray(topTracks.items);
    var parameterString = "";
    var upperLimit=4;
    var x=0;
    if(topTracksShuffled.length<5)
      upperLimit = topTracksShuffled.length-1;
    for(x=0;x<upperLimit;x++){
      parameterString += topTracksShuffled[x].id+','
    }
    parameterString += topTracksShuffled[x].id;
    const res = await axios.get(
        API.API_base + API.recommendations ,{headers: { Authorization: 'Bearer '+token},
      params:{
      seed_tracks:parameterString
    }});
    return res.data;
}

export const getRecommendationsRecentlyPlayed = async (token, topTracks)=>{
    // const topTracksShuffled = shuffleArray(topTracks.items);
    var parameterString = "";
    var upperLimit=4;
    var x=0;
    if(topTracks.items.length<5)
      upperLimit = topTracks.items.length-1;
    for(x=0;x<upperLimit;x++){
      parameterString += topTracks.items[x].track.id+','
    }
    parameterString += topTracks.items[x].track.id
    const res = await axios.get(
        API.API_base + API.recommendations,{headers: { Authorization: 'Bearer '+token},
      params:{
      seed_tracks: parameterString
    }});

    return res.data;
}

export function authUser(){
  window.location.replace(`${authentication.endpoint}?client_id=${authentication.clientId}&redirect_uri=${authentication.redirectUri}&scope=${authentication.scopes.join("%20")}&response_type=token`);
}

function shuffleArray(array2) {
    const array = [...array2];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



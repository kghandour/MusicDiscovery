import React, { Component } from "react";
// import hash from "./hash";
import axios from 'axios'
import "./App.css";
import {UserBar} from "./Components/UserProfile"
import GetRecommendations from "./Components/GetRecommendations"
import TopTracks from "./Components/TopTracks";
import 'bootstrap/dist/css/bootstrap.css'
import {Container} from 'react-bootstrap'


export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "2badfb5ce5af4cf3840edb1968683fdf";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-library-read"
];
// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      token: null,
      user: {
        display_name: "",
        external_urls: {},
        images:[{url:""}]
      },
      topTracks:{
        items: [{
          artists:[{
            id:"",
            name:""
          }],
          id: "",
          external_urls:{},
          genres:[],
          name:""
        }]
      },
      
      topArtists:{
        items: [{
          id: "",
          external_urls:{},
          genres:[],
          name:""
        }]
      },
      recommendations:{
        tracks:[{
          album:{
            images:[{
              height:"",
              url:"",
              width:"",
            }]
          },
          artists:[{
            external_urls:{},
            id:"",
            name:""
          }],
          external_urls:{},
          id:"",
          name:"",

        }]
      },
      player:{
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: "" }],
          duration_ms:0,
        },
        is_playing: "Paused",
        progress_ms: 0
      }
    };
    this.authUser = this.authUser.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  checkToken(){
    const startTime = localStorage.getItem('sDate');
    const currentTime = new Date().getTime();
    const expDuration = 3600*1000;
    const notAccepted = startTime === undefined;
    const isExpired = startTime !== undefined && (currentTime - startTime) >expDuration;
    console.log("Testing token: "+startTime+" Curr time: "+currentTime+" Diff: "+ (currentTime-startTime))
    if( notAccepted || isExpired){
      localStorage.removeItem('sDate');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_info');
      localStorage.removeItem('user_top_tracks');
      return false;
    }else{
      return true;
    }
  }

  authUser(){
    window.location.replace(`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`);
  }

  getUserInfo(token){
    const user_info = localStorage.getItem('user_info');
    if(!user_info){
      axios.get(
        'https://api.spotify.com/v1/me' ,{headers: { Authorization: 'Bearer '+token}}
        ).then(res => {
          localStorage.setItem('user_info',JSON.stringify(res.data));
          this.setState({
            user: res.data
          });
        });
    }else{
      this.setState({
        user: JSON.parse(user_info)
      });
    }
    
  }

  getTopTracks(token){
    const user_top_tracks = localStorage.getItem('user_top_tracks');
    if(!user_top_tracks){
    axios.get(
      'https://api.spotify.com/v1/me/top/tracks' ,{headers: { Authorization: 'Bearer '+token}}
      ).then(res => {
        localStorage.setItem('user_top_tracks',JSON.stringify(res.data));
        this.setState({
          topTracks: res.data,
        },()=>{
          this.getRecommendations(token);
        });
      });
    }else{
      this.setState({
        topTracks: JSON.parse(user_top_tracks)
      },()=>{
        this.getRecommendations(token);
      });
    }
  }

  getTopArtists(token){
    axios.get(
      'https://api.spotify.com/v1/me/top/artists' ,{headers: { Authorization: 'Bearer '+token}}
      ).then(res => {
        this.setState({
          topArtists: res.data
        });
      });
  }

  shuffleArray(array2) {
    const array = [...array2];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getRecommendations(token){
    const topTracksShuffled = this.shuffleArray(this.state.topTracks.items);
    axios.get(
      'https://api.spotify.com/v1/recommendations',{headers: { Authorization: 'Bearer '+token},
      params:{
      seed_tracks:topTracksShuffled[0].id+','+
      topTracksShuffled[1].id+','+
      topTracksShuffled[2].id+','+
      topTracksShuffled[3].id+','+
      topTracksShuffled[4].id
    }}
      ).then(res => {
        this.setState({
          recommendations: res.data
        });
      },err=>{
        console.log(err)
      });
  }

  componentDidMount() {
    // Set token
    var tokenValid = this.checkToken();
    var _token;
    if(tokenValid)
      _token = localStorage.getItem('access_token');
    else{
      _token = hash.access_token;
      if (_token) {
        localStorage.setItem('sDate',new Date().getTime());
        localStorage.setItem('access_token',_token);
      }
    }
    if(_token !== undefined){
      this.getUserInfo(_token);
      this.getTopTracks(_token);
      this.setState({
            token: _token
      });
    }
  }
render() {
  return (
    <Container className="App">
      {!this.state.token &&(
        <button type="button" className="btn btn-primary" onClick={this.authUser}>
          Login to Spotify
        </button>
      )}
      {this.state.token &&(
        <div>
          <UserBar user={this.state.user}/>
          <GetRecommendations recommendations={this.state.recommendations}/>
          <TopTracks topTracks={this.state.topTracks}/>
        </div>
      )}
    </Container>
  );
  }
}
export default App;
import React, { Component } from "react";
// import hash from "./hash";
import "./App.css";
import {UserBar} from "./Components/UserProfile"
import GetRecommendations from "./Components/GetRecommendations"
import {TopTracks, RecentlyPlayed} from "./Components/TopTracks";
import 'bootstrap/dist/css/bootstrap.css'
import {Container, Spinner, Tabs, Tab} from 'react-bootstrap'
import {getRecommendations, getRecommendationsRecentlyPlayed, getTopTracks, getUserInfo, getRecentlyPlayed} from './Helper/Data'
import authentication from './config/authentication.json'

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
          track:{
            artists:[{
              id:"",
              name:""
            }],
            id: "",
            external_urls:{},
            genres:[],
            name:""
          }
        }]
      },
      recentlyPlayed:{
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
      recommendationsRecentlyPlayed:{
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
      },
      isLoadingUser: true,
      isLoadingTopTracks:true,
      isLoadingRecommendations: true,
      isLoadingRecentlyPlayed: true,
      isLoadingRecommendationsRecentlyPlayed: true,
    };
    this.authUser = this.authUser.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  checkToken(){
    const startTime = localStorage.getItem('sDate');
    const currentTime = new Date().getTime();
    const expDuration = 3600*1000;
    const notAccepted = startTime === undefined;
    const isExpired = startTime !== undefined && (currentTime - startTime) >expDuration;
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
    window.location.replace(`${authentication.endpoint}?client_id=${authentication.clientId}&redirect_uri=${authentication.redirectUri}&scope=${authentication.scopes.join("%20")}&response_type=token`);
  }


  async componentDidMount() {
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
      this.setState({
        token: _token
      });
      const user = await getUserInfo(_token);
      this.setState({
        user: user,
        isLoadingUser: false
      });
      const topTracks= await getTopTracks(_token);
      this.setState({
        topTracks: topTracks,
        isLoadingTopTracks: false
      });
      const recommendations = await getRecommendations(_token,topTracks);
      this.setState({
        recommendations: recommendations,
        isLoadingRecommendations: false
      });
      const recentlyPlayed = await getRecentlyPlayed(_token);
      this.setState({
        recentlyPlayed: recentlyPlayed,
        isLoadingRecentlyPlayed: false
      });
      const recommendationsRecentlyPlayed = await getRecommendationsRecentlyPlayed(_token, recentlyPlayed);

      this.setState({
        recommendationsRecentlyPlayed: recommendationsRecentlyPlayed,
        isLoadingRecommendationsRecentlyPlayed: false
      })
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
          {this.state.isLoadingUser ? 
            <Spinner animation="border" variant="success" /> : 
            <UserBar user={this.state.user}/>}
          <h4>Get Recommendations based on:</h4>
          <Tabs defaultActiveKey="topTracks" id="uncontrolled-tab-example">
            <Tab eventKey="topTracks" title="Top Tracks">
              {this.state.isLoadingRecommendations ?
              <Spinner animation="border" variant="success" /> :
              <GetRecommendations recommendations={this.state.recommendations}/>}
              {this.state.isLoadingTopTracks ? 
              <Spinner animation="border" variant="success" />:
              <TopTracks topTracks={this.state.topTracks}/>}
            </Tab>
            <Tab eventKey="recentlyPlayed" title="Recently Played">
              {this.state.isLoadingRecommendationsRecentlyPlayed ?
              <Spinner animation="border" variant="success" /> :
              <GetRecommendations recommendations={this.state.recommendationsRecentlyPlayed}/>}
              {this.state.isLoadingRecentlyPlayed ? 
              <Spinner animation="border" variant="success" />:
              <RecentlyPlayed topTracks={this.state.recentlyPlayed}/>}
            </Tab>
          </Tabs>
          
        </div>
      )}
    </Container>
  );
  }
}
export default App;
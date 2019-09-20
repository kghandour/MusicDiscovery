import React, { Component } from "react";
// import hash from "./hash";
import "./App.css";
import {UserBar} from "./Components/UserProfile"
import GetRecommendations from "./Components/GetRecommendations"
import {TopTracks, RecentlyPlayed} from "./Components/TopTracks";
import {Navigation, Footer} from './Components/Navigation'
import 'bootstrap/dist/css/bootstrap.css'
import {Container, Spinner, Tabs, Tab, Button, Jumbotron} from 'react-bootstrap'
import {getRecommendations, getRecommendationsRecentlyPlayed, getSavedTracks, getTopTracks, getUserInfo, getRecentlyPlayed} from './Helper/Data'
import authentication from './config/authentication.json'
import initStructure from './config/init_structure.json'

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
    this.state = initStructure;
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
      const savedTracks= await getSavedTracks(_token);
      this.setState({
        savedTracks: savedTracks,
        isLoadingSavedTracks: false
      });
      const recommendationsSavedTracks = await getRecommendationsRecentlyPlayed(_token,savedTracks);
      this.setState({
        recommendationsSavedTracks: recommendationsSavedTracks,
        isLoadingRecommendationsSavedTracks: false
      });
    }
  }
render() {
  return (
    <span>
    <Navigation user={this.state.user}/>
    <Container className="App">
      {!this.state.token &&(
        <div>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <button type="button" className="btn btn-primary" onClick={this.authUser}>
          Login to Spotify
        </button>
        </div>
      )}
      {this.state.token &&(
        <div className="contentDiv">
          <Tabs defaultActiveKey="topTracks" id="uncontrolled-tab-example">
            <Tab eventKey="topTracks" title="Top Tracks">
              {this.state.isLoadingRecommendations ?
              <Spinner animation="border" variant="success" /> :
              <GetRecommendations recommendations={this.state.recommendations}/>}
              {this.state.isLoadingTopTracks ? 
              <Spinner animation="border" variant="success" />:
              <TopTracks topTracks={this.state.topTracks} title="View your top liked tracks"/>}
            </Tab>
            <Tab eventKey="recentlyPlayed" title="Recently Played">
              {this.state.isLoadingRecommendationsRecentlyPlayed ?
              <Spinner animation="border" variant="success" /> :
              <GetRecommendations recommendations={this.state.recommendationsRecentlyPlayed}/>}
              {this.state.isLoadingRecentlyPlayed ? 
              <Spinner animation="border" variant="success" />:
              <RecentlyPlayed topTracks={this.state.recentlyPlayed} title="View your recently played tracks"/>}
            </Tab>
            <Tab eventKey="savedTracks" title="Saved Tracks">
              {this.state.isLoadingRecommendationsSavedTracks ?
              <Spinner animation="border" variant="success" /> :
              <GetRecommendations recommendations={this.state.recommendationsSavedTracks}/>}
              {this.state.isLoadingSavedTracks ? 
              <Spinner animation="border" variant="success" />:
              <RecentlyPlayed topTracks={this.state.savedTracks} title="View your recently liked tracks"/>}
            </Tab>
          </Tabs>
        </div>
      )}
    </Container>
    <Footer user={this.state.user}/>
    </span>
  );
  }
}
export default App;
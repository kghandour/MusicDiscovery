import React, { Component } from "react";
// import hash from "./hash";
import "./App.css";
import GetRecommendations from "./Components/GetRecommendations";
import {NotLoggedIn} from './Components/NotLoggedIn';
import {TopTracks, RecentlyPlayed} from "./Components/TopTracks";
import {Navigation, Footer} from './Components/Navigation'
import 'bootstrap/dist/css/bootstrap.css'
import {Container, Spinner, Tabs, Tab} from 'react-bootstrap'
import {getRecommendations, getRecommendationsRecentlyPlayed, getSavedTracks, getTopTracks, getUserInfo, getRecentlyPlayed} from './Helper/Data'
import initStructure from './config/init_structure.json'
import {ErrorAlert} from './Components/ErrorAlert'

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

      try{
        const user = await getUserInfo(_token);
        this.setState({
          user: user,
          isLoadingUser: false
        });
      }catch(error){
        this.setState({
          userError: error
        });
      }

      try{
        const topTracks= await getTopTracks(_token);
        this.setState({
          topTracks: topTracks,
          isLoadingTopTracks: false
        });
      }catch(error){
        this.setState({
          topTracksError: error.message
        });
      }

      try{
        const recommendations = await getRecommendations(_token,this.state.topTracks);
        this.setState({
          recommendations: recommendations,
          isLoadingRecommendations: false
        });
      }catch(error){
        this.setState({
          recommendationsError: error.message
        });
      }
      try{
        const recentlyPlayed = await getRecentlyPlayed(_token);
        this.setState({
          recentlyPlayed: recentlyPlayed,
          isLoadingRecentlyPlayed: false
        });
      }catch(error){
        this.setState({
          recentlyPlayedError: error.message
        });
      }

      try{
        const recommendationsRecentlyPlayed = await getRecommendationsRecentlyPlayed(_token, this.state.recentlyPlayed);
        this.setState({
          recommendationsRecentlyPlayed: recommendationsRecentlyPlayed,
          isLoadingRecommendationsRecentlyPlayed: false
        })
      }catch(error){
        this.setState({
          recommendationsRecentlyPlayedError: error.message
        });
      }

      try{
      const savedTracks= await getSavedTracks(_token);
      this.setState({
        savedTracks: savedTracks,
        isLoadingSavedTracks: false
      });
      }catch(error){
        this.setState({
          savedTracksError: error.message
        });
      }

      try{
        const recommendationsSavedTracks = await getRecommendationsRecentlyPlayed(_token,this.state.savedTracks);
        this.setState({
          recommendationsSavedTracks: recommendationsSavedTracks,
          isLoadingRecommendationsSavedTracks: false
        });
      }catch(error){
        this.setState({
          recommendationsSavedTracksError: error.message
        });
      }

    }
  }
render() {
  return (
    <span>
    <Navigation user={this.state.user} userError={this.state.userError}/>
    <Container className="App">
      {!this.state.token &&(
        <NotLoggedIn />
      )}
      {this.state.token &&(
        <div className="contentDiv">
          <Tabs defaultActiveKey="topTracks" id="uncontrolled-tab-example">
            <Tab eventKey="topTracks" title="Top Tracks">
              {this.state.isLoadingRecommendations ?
              ( this.state.recommendationsError ? 
                <ErrorAlert error={this.state.recommendationsError} /> :
                <Spinner animation="border" variant="success" /> ):
              <GetRecommendations recommendations={this.state.recommendations}/>}
              {this.state.isLoadingTopTracks ? 
              ( this.state.topTracksError ? 
                <ErrorAlert error={this.state.topTracksError} /> :
                <Spinner animation="border" variant="success" /> ):
              <TopTracks topTracks={this.state.topTracks} title="View your top liked tracks"/>}
            </Tab>
            <Tab eventKey="recentlyPlayed" title="Recently Played">
              {this.state.isLoadingRecommendationsRecentlyPlayed ?
              ( this.state.recommendationsRecentlyPlayedError ? 
                <ErrorAlert error={this.state.recommendationsRecentlyPlayedError} /> :
                <Spinner animation="border" variant="success" /> ):
              <GetRecommendations recommendations={this.state.recommendationsRecentlyPlayed}/>}
              {this.state.isLoadingRecentlyPlayed ? 
              ( this.state.recentlyPlayedError ? 
                <ErrorAlert error={this.state.recentlyPlayedError} /> :
                <Spinner animation="border" variant="success" /> ):
              <RecentlyPlayed topTracks={this.state.recentlyPlayed} title="View your recently played tracks"/>}
            </Tab>
            <Tab eventKey="savedTracks" title="Saved Tracks">
              {this.state.isLoadingRecommendationsSavedTracks ?
              ( this.state.recommendationsSavedTracksError ? 
                <ErrorAlert error={this.state.recommendationsSavedTracksError} /> :
                <Spinner animation="border" variant="success" /> ):
              <GetRecommendations recommendations={this.state.recommendationsSavedTracks}/>}
              {this.state.isLoadingSavedTracks ? 
              ( this.state.savedTracksError ? 
                <ErrorAlert error={this.state.savedTracksError} /> :
                <Spinner animation="border" variant="success" /> ):
              <RecentlyPlayed topTracks={this.state.savedTracks} title="View your recently liked tracks"/>}
            </Tab>
          </Tabs>
        </div>
      )}
    </Container>
    <Footer user={this.state.user} userError={this.state.userError}/>
    </span>
  );
  }
}
export default App;
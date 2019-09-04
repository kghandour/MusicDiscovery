import React, { Component } from "react";
// import hash from "./hash";
import axios from 'axios'
import "./App.css";
import * as $ from "jquery";
import Player from "./Player";
export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "2badfb5ce5af4cf3840edb1968683fdf";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
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
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    axios.get(
      'https://api.spotify.com/v1/me/player',{headers: { Authorization: 'Bearer '+token}}
      ).then(res => {
        this.setState({
          item: res.data.item,
          is_playing: res.data.is_playing,
          progress_ms: res.data.progress_ms,
        });
      });
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      console.log(_token)
      // Set token
      this.setState({
        token: _token
      });
    }
  }
render() {
  return (
    <div>
      {!this.state.token &&(
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`}
        >
          Login to Spotify
        </a>
      )}
      {this.state.token &&(
        <div>
        {this.getCurrentlyPlaying(this.state.token)}
        <Player
          item={this.state.item}
          is_playing={this.state.is_playing}
          progress_ms={this.progress_ms}
        />
        </div>
      )}
    </div>
  );
  }
}
export default App;
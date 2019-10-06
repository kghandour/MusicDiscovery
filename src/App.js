import React from 'react';
import { Route, Link, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'

import { Container, Button } from 'react-bootstrap';
import { NotLoggedIn } from './Components/NoAuth';
import { isLogin } from './Helper';
import Recommendations from './Pages/Recommendations';
import {Navigation} from './Components/Navs';

const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = "";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null
        }
    }

    checkToken = () => {
        const startTime = localStorage.getItem('sDate');
        const currentTime = new Date().getTime();
        const expDuration = 3600 * 1000;
        const notAccepted = startTime === undefined;
        const isExpired = startTime !== undefined && (currentTime - startTime) > expDuration;
        if (notAccepted || isExpired) {
            localStorage.removeItem('sDate');
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_info');
            localStorage.removeItem('user_top_tracks');
            return false;
        } else {
            return true;
        }
    };

    validateUser = () => {
        var tokenValid = this.checkToken();
        var _token;
        if (tokenValid)
            _token = localStorage.getItem('access_token');
        else {
            _token = hash.access_token;
            if (_token) {
                localStorage.setItem('sDate', new Date().getTime());
                localStorage.setItem('access_token', _token);
            }
        }
        if (_token !== undefined) {
            this.setState({
                token: _token
            })
        }
    }

    componentDidMount() {
        this.validateUser();
    }

    render() {
        return (
            <div>
            {
                this.state.token &&
                <Navigation />
            }
            <Switch>
                <Route path="/">
                    {!this.state.token && <NotLoggedIn />}
                    {this.state.token && <Recommendations token={this.state.token} />}
                </Route>
            </Switch>
            </div>

        )
    }
}
export default App
import React from 'react';
import { Container, Dropdown, DropdownButton, Button, Spinner } from 'react-bootstrap'
import { Tracks } from '../Components/Tracks';
import { getRecommendations, getRecommendationsRecentlyPlayed, getSavedTracks, getTopTracks, getUserInfo, getRecentlyPlayed } from '../Helper/Data'
import initStructure from '../config/init_structure.json'
import {ErrorAlert} from '../Components/ErrorAlert'


var token;
class Recommendations extends React.Component {
    constructor(props) {
        super(props)
        this.state = initStructure;
        this.filterSearch = this.filterSearch.bind(this);
        token = props.token;
    }

    filterSearch(title) {
        this.setState({
            filterTitle: title
        })
    }

    async componentDidMount() {
        try {
            const topTracks = await getTopTracks(token);
            this.setState({
                token: token,
                topTracks: topTracks,
                isLoadingTopTracks: false
            });
        } catch (error) {
            this.setState({
                topTracksError: error.message
            });
        }

        try {
            const recommendations = await getRecommendations(token, this.state.topTracks);
            this.setState({
                recommendations: recommendations,
                isLoadingRecommendations: false
            });
        } catch (error) {
            this.setState({
                recommendationsError: error.message
            });
        }


    }

    render() {
        return (
            <Container>
                <div className="text-center">
                    <div className="subtitle-76">
                        Recommendations
                    </div>
                    <div className="filter-p">
                        Filter Recommendations based on:
                    <DropdownButton id="dropdown-basic" variant="danger" title={this.state.filterTitle} onSelect={this.filterSearch}>
                            {['Your Top Tracks', 'Your Recently Played', 'Your Recently Saved Tracks'].map(
                                variant => (
                                    <Dropdown.Item eventKey={variant} key={variant}>{variant}</Dropdown.Item>
                                ),
                            )}
                        </DropdownButton>
                    </div>
                    <Button className="create-playlist">Create Playlist</Button>
                    {this.state.isLoadingRecommendations ?
                        (this.state.recommendationsError ?
                            <ErrorAlert error={this.state.recommendationsError} /> :
                            <Spinner animation="border" variant="success" />) :
                        <Tracks recommendations={this.state.recommendations} />}

                </div>
            </Container>
        )
    }
}

export default Recommendations;
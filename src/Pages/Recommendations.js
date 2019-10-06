import React from 'react';
import { Container, Dropdown, DropdownButton, Button, Spinner } from 'react-bootstrap'
import { Tracks } from '../Components/Tracks';
import { addTracksToPlaylist, createPlaylist, getRecommendations, getRecommendationsRecentlyPlayed, getSavedTracks, getTopTracks, getUserInfo, getRecentlyPlayed } from '../Helper/Data'
import initStructure from '../config/init_structure.json'
import { ErrorAlert } from '../Components/ErrorAlert'
import { ToastContainer, toast } from 'react-toastify';
import {Footer} from '../Components/Footer'
import 'react-toastify/dist/ReactToastify.css';


var token;

const filterList = ['Your Top Tracks', 'Your Recently Played', 'Your Recently Saved Tracks'];
class Recommendations extends React.Component {
    constructor(props) {
        super(props)
        this.state = initStructure;
        this.filterSearch = this.filterSearch.bind(this);
        this.onCreatePlaylist = this.onCreatePlaylist.bind(this);
        token = props.token;
    }

    async filterSearch(title) {
        this.setState({
            filterTitle: title
        })
        if (title === filterList[1]) {
            try {
                if (this.state.isLoadingRecentlyPlayed) {
                    const recentlyPlayed = await getRecentlyPlayed(token);
                    this.setState({
                        recentlyPlayed: recentlyPlayed,
                        isLoadingRecentlyPlayed: false
                    });
                }
            } catch (error) {
                this.setState({
                    recentlyPlayedError: error.message
                });
            }

            try {
                if (this.state.isLoadingRecommendationsRecentlyPlayed) {
                    const recommendationsRecentlyPlayed = await getRecommendationsRecentlyPlayed(token, this.state.recentlyPlayed);
                    this.setState({
                        recommendationsRecentlyPlayed: recommendationsRecentlyPlayed,
                        isLoadingRecommendationsRecentlyPlayed: false
                    })
                }
            } catch (error) {
                this.setState({
                    recommendationsRecentlyPlayedError: error.message
                });
            }
        }

        if (title === filterList[2]) {
            try {
                if (this.state.isLoadingSavedTracks) {
                    const savedTracks = await getSavedTracks(token);
                    this.setState({
                        savedTracks: savedTracks,
                        isLoadingSavedTracks: false
                    });
                }
            } catch (error) {
                this.setState({
                    savedTracksError: error.message
                });
            }

            try {
                if (this.state.isLoadingRecommendationsSavedTracks) {
                    const recommendationsSavedTracks = await getRecommendationsRecentlyPlayed(token, this.state.savedTracks);
                    this.setState({
                        recommendationsSavedTracks: recommendationsSavedTracks,
                        isLoadingRecommendationsSavedTracks: false
                    });
                }
            } catch (error) {
                this.setState({
                    recommendationsSavedTracksError: error.message
                });
            }

        }

    }

    async componentDidMount() {
        try {
            const user = await getUserInfo(token);
            this.setState({
                user: user,
                isLoadingUser: false
            });
        } catch (error) {
            this.setState({
                userError: error
            });
        }

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

    async onCreatePlaylist() {
        try {
            const createPlaylistRes = await createPlaylist(token, this.state.user.id, this.state.filterTitle);
            if (this.state.filterTitle === filterList[0])
                await addTracksToPlaylist(token, createPlaylistRes.id, this.state.recommendations.tracks);
            if (this.state.filterTitle === filterList[1])
                await addTracksToPlaylist(token, createPlaylistRes.id, this.state.recommendationsRecentlyPlayed.tracks);
            if (this.state.filterTitle === filterList[2])
                await addTracksToPlaylist(token, createPlaylistRes.id, this.state.recommendationsSavedTracks.tracks);
            this.setState({
                playlist_link: createPlaylistRes.uri
            })
            toast.success("Successfully created playlist. Click here to open it.")
        } catch (error) {
            console.log(error);
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
                            {filterList.map(
                                variant => (
                                    <Dropdown.Item eventKey={variant} key={variant}>{variant}</Dropdown.Item>
                                ),
                            )}
                        </DropdownButton>
                    </div>
                    <Button className="create-playlist" onClick={this.onCreatePlaylist}>Create Playlist</Button><br />
                    <a href={this.state.playlist_link}><ToastContainer /></a>
                    {this.state.filterTitle === filterList[0] ? (this.state.isLoadingRecommendations ?
                        (this.state.recommendationsError ?
                            <ErrorAlert error={this.state.recommendationsError} /> :
                            <Spinner animation="border" variant="danger" />) :
                        <Tracks recommendations={this.state.recommendations} />) : null}
                    {this.state.filterTitle === filterList[1] ? (this.state.isLoadingRecommendationsRecentlyPlayed ?
                        (this.state.recommendationsError ?
                            <ErrorAlert error={this.state.recommendationsError} /> :
                            <Spinner animation="border" variant="danger" />) :
                        <Tracks recommendations={this.state.recommendationsRecentlyPlayed} />) : null}
                    {this.state.filterTitle === filterList[2] ? (this.state.isLoadingRecommendationsSavedTracks ?
                        (this.state.recommendationsError ?
                            <ErrorAlert error={this.state.recommendationsError} /> :
                            <Spinner animation="border" variant="danger" />) :
                        <Tracks recommendations={this.state.recommendationsSavedTracks} />) : null}
                </div>
                <Footer />
            </Container>
        )
    }
}

export default Recommendations;
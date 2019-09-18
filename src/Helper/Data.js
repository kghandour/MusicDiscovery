import {UseLocalStorage} from './Hooks.js';
import {CallAPI} from './Hooks.js';
import API_endpoints from '../config/API_endpoints.json';

export function VerifyToken(){
    const startTime = UseLocalStorage('sDate', undefined);
    const currentTime = new Date().getTime();
    const expDuration = 3600*1000;
    const notAccepted = startTime === undefined;
    const isExpired = startTime !== undefined && (currentTime - startTime) >expDuration;
    if( notAccepted || isExpired ){
        localStorage.removeItem('sDate');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_top_tracks');
        return false;
    }
    return true;
}

export function GetUserData(token){
    const [{data,isLoading, isError}, setUrl] = CallAPI(token, API_endpoints.API_base + 'me','', 'user_info');
    return [{data,isLoading,isError}];
}

export function GetTopTracks(token){
    const [{topTracks,isTLoading, isTError}, setUrl] = CallAPI(token, API_endpoints.API_base + API_endpoints.top_tracks, '','user_top_tracks');
    const [{recommendations,isRLoading, isRError}, setRecommendationURL] = GetRecommendations(token, topTracks);
    return [{topTracks, recommendations,isTLoading, isRLoading,isTError,isRError}];
}

export function GetRecommendations(token, topTracks){
    const topTracksShuffled = shuffleArray(topTracks);
    if(topTracksShuffled !== undefined){
    const params={
        seed_tracks:topTracksShuffled[0].id+','+
        topTracksShuffled[1].id+','+
        topTracksShuffled[2].id+','+
        topTracksShuffled[3].id+','+
        topTracksShuffled[4].id
    }
    const [{recommendations,isRLoading, isRError}, setUrl] = CallAPI(token, API_endpoints.API_base + API_endpoints.recommendations, params);
    return[{recommendations,isRLoading, isRError}, setUrl];
    }
}

function shuffleArray(array2) {
    if(array2){
    const array = [...array2];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }
    return array2;
  }
import React from 'react';
export const UserBar = props => {
    return(
        <span className="userbar">
            <b><a href={props.user.external_urls.spotify}>
            {props.user.display_name}</a></b>
            <img src={props.user.images[0].url} alt=""/>
        </span>
    );
}

// const UserProfile = props => {
//     return (
//         null
//     );
// }
 
// export default UserProfile;
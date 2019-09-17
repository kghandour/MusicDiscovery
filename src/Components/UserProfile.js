import React from 'react';
import {Media, Card} from 'react-bootstrap';
export const UserBar = props => {
    return(
        <Card>
        <Card.Body>
        <Media>
        <img
            width={96}
            height={96}
            className="mr-3"
            src={props.user.images[0].url}
        />
        <Media.Body>
            <h4>Welcome,</h4>
            <h1><a href={props.user.uri}>
            {props.user.display_name}</a></h1>
            
        </Media.Body>
        </Media>
        </Card.Body>
        </Card>
    );
}

// const UserProfile = props => {
//     return (
//         null
//     );
// }
 
// export default UserProfile;
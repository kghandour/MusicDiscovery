import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';

export const ErrorAlert = props =>{
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            This rarely happens! Please try to report it to the developer. <br />
            Email: bugs@kghandour.com<br />
            <a href='mailto:bugs@kghandour.com?subject=[Bug]SuggestionsForSpotify'>Press here to report to the developer</a>
          </p>
        </Alert>
      );
    }
    return <div />
}
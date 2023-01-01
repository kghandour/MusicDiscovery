import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';

export const ErrorAlert = props =>{
    var errorTitle = "";
    var errorBody = "";
    if(props.error === "Network Error"){
      errorTitle = "Internet disconnnected";
      errorBody = "Looks like your internet connection was lost. Please try refreshing the page."
    }
    else if(props.error === "No tracks obtained"){
      errorTitle = props.error;
      errorBody = "Try to listen and like more tracks."
    }else{
      errorTitle = "Oops! There is an Error";
      errorBody = "Something went wrong."
    }
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{errorTitle}</Alert.Heading>
          <p>
            {errorBody} <br />
            If the problem continues to persist, please report it to the developer<br />
            <span className="blackLink"><a href={"mailto:"+process.env.REACT_APP_BUGSEMAIL+"?subject=[Bug]"+process.env.REACT_APP_TITLE+"&body=Error:"+props.error+""}>Press here to report to the developer</a></span>
          </p>
        </Alert>
      );
    }
    return <div />
}
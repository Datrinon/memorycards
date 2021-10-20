import React, { useEffect, useState } from 'react';
//import useHTTPFetch from "../hooks/useHTTPFetch"; 
// Don't think we need that, since the state doesn't depend on the fetch from the data.
// 

function Loading(props) {

  let loadingElement;
  const [finishedLoading, setFinishedLoading] = useState(false);

  switch (props.gameState) {    
    case "beforestart":
      loadingElement = (
        <div>
          <p className="welcome-dialog">
            Can you remember which cards you picked?
            The goal of this game is to select all the cards once,
            without selecting them again! There are {props.numLevels} levels.
            Good luck!
          </p>
          <button
            onClick={props.advanceState}
            disabled={!finishedLoading}>
            Begin Game</button>
        </div>
      );
      break;
    default:
      break;
  }

  // use this useEffect in order to perform network requests after loading.
  useEffect(() => {
    Promise.all(props.cards.map((topic) => {
      // .json() returns a promise to give data after its done processing.
      return fetch(`https://foodish-api.herokuapp.com/api/images/${topic}/`).then(resp => resp.json())
    })).then((results) => {
      console.log(results);
      setFinishedLoading(true);
    })
  }, [props.cards]);

  return (
    <div>
      {!finishedLoading &&
        <p>Now Loading... Please Wait.</p>
      }
      {finishedLoading && 
        <p>Loading Complete!</p>
      }
      {loadingElement}
    </div>
  );
}

export default Loading;
import React, { useEffect, useState } from 'react';
//import useHTTPFetch from "../hooks/useHTTPFetch"; 
// Don't think we need that, since the state doesn't depend on the fetch from the data.
// 

function Loading(props) {

  let loadingElement;
  let finishedLoading = false;

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
            disabled={finishedLoading}>
            Begin Game</button>
        </div>
      );
      break;
    default:
      break;
  }

  // use this useEffect in order to perform network requests after loading.
  useEffect() {
    // use a batch call with promises using 
    props.cards;
  }

  return (
    <div>
      {!props.finishedLoading &&
        <p>Now Loading... Please Wait.</p>
      }
      {props.finishedLoading && 
        <p>Loading Complete!</p>
      }
      {loadingElement}
    </div>
  );
}
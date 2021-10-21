import React from 'react';

/**
 * This component explains how to play the game and lets the user begin playing.
 * @param {*} props 
 * @returns 
 */
function GameInfo() {
  return (
    <div>
    <p className="welcome-dialog">
      Can you remember which cards you picked?
      The goal of this game is to select all the cards once,
      without selecting them again!
      Good luck!
    </p>
  </div>
  )
}

export default GameInfo;
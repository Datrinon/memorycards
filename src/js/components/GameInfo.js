import React from 'react';

/**
 * This component explains how to play the game and lets the user begin playing.
 * @param {*} props 
 * @returns 
 */
function GameInfo() {
  return (
    <div className="welcome-dialog">
      <h1 className="hook">How good is your memory?</h1>
      <p>
        The goal of this game is to select all the shown cards once. Clicking
        on a card more than once will result in game over.
      </p>
      <p>Good luck!</p>
  </div>
  )
}

export default GameInfo;
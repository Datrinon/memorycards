import React, { useEffect, useState } from 'react';

function Menu(props) {

  let difficultyCaption;

  return (
    <div>
      <h1>Memory Game</h1>
      <button onClick={props.startGame}>Play!</button>
      <label>
        <input type="checkbox" onClick={props.toggleHardMode}></input>
        Enable Hard Difficulty
      </label>
      <p>You'll get {props.timePerCard} seconds per card.</p>
    </div>
  )
}

export default Menu;
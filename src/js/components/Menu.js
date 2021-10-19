import React, { useState } from 'react';

function Menu(props) {
  return (
    <div>
      <h1>Welcome to Memory Game</h1>
      <p>Select as many cards as you can without repeating them.</p>
      <button onClick={props.startGame}>Start Game</button>
      <p>To do -- difficulty selector.</p>
    </div>
  )
}

export default Menu;
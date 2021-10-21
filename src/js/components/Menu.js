import React, { useState } from 'react';

function Menu(props) {
  return (
    <div>
      <h1>Memory Game</h1>
      <button onClick={props.startGame}>Play!</button>
      <p>To do -- difficulty selector.</p>
    </div>
  )
}

export default Menu;
import React, { useEffect, useState } from 'react';
import "../../css/Menu.css";


function Menu(props) {
  const [animation, setAnimation] = useState(0);
  
  function handleCheckboxClick(event) {
    props.toggleHardMode(event);
    setAnimation((prevAnimation) => {
      return prevAnimation === 1 ? 0 : 1;
    });
  }

  return (
    <div className="menu">
      <h1 className="game-title">Memory Game</h1>
      <button onClick={props.startGame} className="play-button">Play!</button>
      <label className="enable-hard">
        <input type="checkbox" onClick={handleCheckboxClick}></input>
        Enable Hard Mode
      </label>
      <p className="difficulty-caption" animation={animation}>You'll get <span className="seconds">{props.timePerCard} seconds</span> per card.</p>
    </div>
  )
}

export default Menu;
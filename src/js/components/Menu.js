import React, { useEffect, useState } from 'react';
import "../../css/Menu.css";

import Logo from "../../images/logo.png";


function Menu(props) {
  const [playAnimation, setPlayAnimation] = useState(0);
  const [checkboxAnimation, setCheckboxAnimation] = useState(0);
  
  function handleCheckboxClick(event) {
    props.toggleHardMode(event);
    setCheckboxAnimation((prevAnimation) => {
      return prevAnimation === 1 ? 0 : 1;
    });
  }

  function handlePlayButtonClick(event) {
    setPlayAnimation(1);
    document.querySelector('.menu').onanimationend = () => props.startGame(event);
  }

  return (
    <div className="menu" animation={playAnimation}>
      <h1 className="game-title">Memory Game</h1>
      <img className="logo" src={Logo}/>
      <button onClick={handlePlayButtonClick} className="play-button">Play!</button>
      <label className="enable-hard">
        <input type="checkbox" onClick={handleCheckboxClick}></input>
        Enable Hard Mode
      </label>
      <p className="difficulty-caption" animation={checkboxAnimation}>You'll get <span className="seconds">{props.timePerCard} seconds</span> per card.</p>
    </div>
  )
}

export default Menu;
import React, { useState } from 'react';
import "../../css/Menu.css";

import Logo from "../../images/logo.png";


function Menu(props) {
  const [playAnimation, setPlayAnimation] = useState(0);
  const [isChecked, setIsChecked] = useState(props.timePerCard === 3);
  const [checkboxAnimation, setCheckboxAnimation] = useState(0);
  
  function handleCheckboxClick(event) {
    props.toggleHardMode(event);
    setCheckboxAnimation((prevAnimation) => {
      return prevAnimation === 1 ? 0 : 1;
    });
    setIsChecked(true);
  }

  function handlePlayButtonClick(event) {
    props.resetCurrentScore();
    setPlayAnimation(1);
    document.querySelector('.menu').onanimationend = () => props.startGame(event);
  }

  return (
    <div className="menu" animation={playAnimation}>
      <img className="logo" alt="game logo" src={Logo}/>
      <h1 className="game-title">Memory Game</h1>
      <button onClick={handlePlayButtonClick} className="play-button">Play!</button>
      <p className="hi-score">High Score: {props.highScore}</p>
      <label className="enable-hard">
        <input type="checkbox" onChange={handleCheckboxClick} checked={isChecked}></input>
        Enable Hard Mode
      </label>
      <p className="difficulty-caption" animation={checkboxAnimation}>You'll get <span className="seconds">{props.timePerCard} seconds</span> per card.</p>
    </div>
  )
}

export default Menu;
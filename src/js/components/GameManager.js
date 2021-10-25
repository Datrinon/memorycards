import React, { useState } from 'react';
import '../../css/Game.css';

import Menu from "./Menu";
import Game from './Game';

import GAME_STATE from '../Models/GameState';

function GameManager() {

  const [levels, setLevels] = useState([3, 3]); //useState([3, 4, 6, 8, 10]);
  const [gameCurrentState, setGameCurrentState] = useState(GAME_STATE.MENU);
  const [timePerCard, setTimePerCard] = useState(5);
  // TODO
  // keep track of HIGH score.
  console.log("Current state:" + gameCurrentState);


  function setGameState(state) {
    setGameCurrentState(state);
  }

  function toggleHardMode(event) {
    if (event.target.checked) {
      setTimePerCard(3);
    } else {
      setTimePerCard(5);
    }
  }

  function determineSectionToRender() {
    switch(gameCurrentState) {
      case GAME_STATE.MENU:
        return (
          <Menu
            startGame={setGameCurrentState.bind(null, GAME_STATE.PLAYING)}
            toggleHardMode={toggleHardMode}
            timePerCard={timePerCard}
            />
          // TODO
          // A difficulty selector which sets the number of levels and time per card.
        );
      case GAME_STATE.PLAYING:
        return (
          <Game
            levels = {levels}
            setGameState={setGameState}
            timePerCard = {timePerCard}
          />
        );
      case GAME_STATE.GAMEOVER_LOSE:
        return (
          <div className="game-over dialog-menu">
            <p>Game Over! Better luck next time!</p>
            <button
              className="play-again"
              onClick={setGameCurrentState.bind(null, GAME_STATE.PLAYING)}>
                Play Again
            </button>
            <button
              className="go-to-menu"
              onClick={setGameState.bind(null, GAME_STATE.MENU)}>
              Return to Main Menu</button>
          </div>
        );
      default: 
        break;
    }
  }
  

  return (
    <>
    {determineSectionToRender()}
    </>
  )
}

export default GameManager;
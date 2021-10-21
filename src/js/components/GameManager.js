import React, { useState } from 'react';
import '../../css/Game.css';

import Menu from "./Menu";
import Game from './Game';

import GAME_STATE from '../Models/GameState';

function GameManager() {

  const [levels, setLevels] = useState([3, 4, 6, 8, 10]);
  const [gameCurrentState, setGameCurrentState] = useState(GAME_STATE.MENU);
  // TODO
  // keep track of HIGH score.

  function determineSectionToRender() {
    switch(gameCurrentState) {
      case GAME_STATE.MENU:
        return (
          <Menu startGame={setGameCurrentState.bind(null, GAME_STATE.PLAYING)} />
          // TODO
          // A difficulty selector which sets the number of levels and time per card.
        );
        break;
      case GAME_STATE.PLAYING:
        return (
          <Game
            levels = {levels}
          />
        );
        break;
      default: 
        break;
    }
  }
  

  return (
    <div>
      {determineSectionToRender()}
    </div>
  )
}

export default GameManager;
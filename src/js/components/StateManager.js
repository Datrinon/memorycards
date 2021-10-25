import React, { useEffect, useState } from 'react';
import '../../css/Game.css';

import Menu from "./Menu";
import Game from './Game';
import LoseScreen from "./LoseScreen";


function StateManager() {

  const [levels, setLevels] = useState([3, 4, 6, 8, 10]); //useState([3, 4, 6, 8, 10]);
  const [gameCurrentState, setGameCurrentState] = useState(GAME_STATE.MENU);
  const [timePerCard, setTimePerCard] = useState(5);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  console.log("Current state:" + gameCurrentState);

  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore)
    }
  }, [currentScore]);

  function toggleHardMode(event) {
    if (event.target.checked) {
      setTimePerCard(3);
    } else {
      setTimePerCard(5);
    }
  }

  function resetCurrentScore() {
    setCurrentScore(0);
  }

  function determineSectionToRender() {
    switch(gameCurrentState) {
      case GAME_STATE.MENU:
        return (
          <Menu
            startGame={setGameCurrentState.bind(null, GAME_STATE.PLAYING)}
            toggleHardMode={toggleHardMode}
            timePerCard={timePerCard}
            highScore={highScore}
            resetCurrentScore={resetCurrentScore}
            />
        );
      case GAME_STATE.PLAYING:
        return (
          <Game
            levels = {levels}
            setGameState={setGameCurrentState}
            timePerCard = {timePerCard}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
          />
        );
      case GAME_STATE.GAMEOVER_LOSE:
        return (
          <LoseScreen
            setGameState={setGameCurrentState}
            currentScore={currentScore}
            resetCurrentScore={resetCurrentScore}
          />
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

export default StateManager;
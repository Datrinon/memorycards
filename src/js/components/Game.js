import React, { useState } from 'react';
import '../../css/Game.css';

import Menu from "./Menu";
import Loading from "./Loading";


function Game() {
  const GAME_STATES = ["menu", "beforestart", "playing", "round_win", "gameover_win", "gameover_lose"];
  const TYPES = ["biryani", "burger", "butter-chicken", "dessert", "dosa",
  "idly", "pasta", "pizza", "rice", "samosa"];
  const [levels, setLevels] = useState([3, 4, 6, 8, 10]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [typesForCurrentLevel, setTypesForCurrentLevel] = useState(null);
  const [gameCurrentState, setGameCurrentState] = useState("menu");

  /**
   * Generates a number of topics for use on the memory cards. Ideally,
   * we pass these off to the API when we fetch data in a hook.
   * @returns {string[]} array of valid topics to give to the API to fetch images of.
   */
  function generateMemoryCardTypesForCurrentLevel() {
    let currentLevelTypes = [];
    let i = 0;

    while (i < levels[currentLevel]) {
      let index = Math.round(Math.random() * (TYPES.length - 1));
      console.log(index);
      
      if (currentLevelTypes.includes(TYPES[index])) {
        continue;
      } else {
        currentLevelTypes.push(TYPES[index]);
        i++;
      }
    }

    setTypesForCurrentLevel(currentLevelTypes);
    setGameCurrentState("beforestart");
    console.log(currentLevelTypes);
  }

  function generateMemoryCards(...JSONresponses) {
    //TODO, finish later.
  }


  function determineSectionToRender() {
    switch(gameCurrentState) {
      case "menu":
        return (
          <Menu startGame={generateMemoryCardTypesForCurrentLevel} />
        );
      case "beforestart":
        return (
          <Loading
            advanceState={setGameCurrentState.bind(null, "begin")}
            gameState={"beforestart"}
            numLevels={levels.length}
            cards={typesForCurrentLevel}
            onLoadFinish={generateMemoryCards}
          />
        );
      case "begin":
        return (
          <div>
            The game starts here.
          </div>
        );
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

export default Game;
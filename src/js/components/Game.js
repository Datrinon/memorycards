import React, { useState } from 'react';
import '../../css/Game.css';

import Menu from "./Menu";


function Game() {
  const types = ["biryani", "burger", "butter-chicken", "dessert", "dosa",
  "idly", "pasta", "pizza", "rice", "samosa"];
  const [levels, setLevels] = useState([3, 4, 6, 9 ,12]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [typesForCurrentLevel, setTypesForCurrentLevel] = useState(null);

  /**
   * Generates a number of topics for use on the memory cards. Ideally,
   * we pass these off to the API when we fetch data in a hook.
   * @returns {string[]} array of valid topics to give to the API to fetch images of.
   */
    function generateMemoryCardTypesForCurrentLevel() {
      let currentLevelTypes = [];
      let i = 0;

      while (i < levels[currentLevel]) {
        let index = Math.round(Math.random() * (types.length - 1));
        console.log(index);
        
        if (currentLevelTypes.includes(types[index])) {
          continue;
        } else {
          currentLevelTypes.push(types[index]);
          i++;
        }
      }

      setTypesForCurrentLevel(currentLevelTypes);
      console.log(currentLevelTypes);
    }

  return (
    <div>
      <Menu startGame={generateMemoryCardTypesForCurrentLevel} />
    </div>
  )
}

export default Game;
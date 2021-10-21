import React, { useEffect, useState } from 'react';
import Loading from "./Loading";


function Game(props) {
  const [playerReady, setPlayerReady] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [memoryCards, setMemoryCards] = useState(null);

  function receiveMemoryCards(cards) {
    console.log(JSON.stringify(cards));
    setMemoryCards(cards);
  }


  function playerIsReady() {
    setPlayerReady(true);
  }


  if (!playerReady) {
    return (
      <Loading
        currentLevel={currentLevel}
        numCardsForLevel={props.levels[currentLevel]}
        playerReady={playerIsReady}
        passBackMemoryCards={receiveMemoryCards}
      />
    )
  }

  return (
    <div>
      The game starts here.
      {memoryCards}
    </div>
  );
}

export default Game;
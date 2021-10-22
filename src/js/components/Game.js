import React, { useEffect, useRef, useState } from 'react';
import Loading from "./Loading";
import MemoryCard from './MemoryCard';

import GAME_STATE from '../Models/GameState';

import { cloneDeep } from 'lodash';

// dummy data imports, remove later.
import Burger from "../../images/burger01.png";
import Chicken from "../../images/chicken01.png";
import Cola from "../../images/cola01.png";
import Utility from '../Util/utility';

import useScore from '../hooks/useScore';


const DUMMY_CARDS = [
  <MemoryCard 
    id={0}
    key={Burger}
    src={Burger}
  />,
  <MemoryCard
    id={1}
    key={Chicken}
    src={Chicken}
  />,
  <MemoryCard
    id={2}
    key={Cola}
    src={Cola}
  />
]

const DUMMY_CARDS_STATUS = [
  {
    id: 0,
    pressed: false,
  },
  {
    id: 1,
    pressed: false,
  },
  {
    id: 2,
    pressed: false
  }
]

const DUMMY_STATE_READY = true;



function Game(props) {
  // debugger;
  const [playerReady, setPlayerReady] = useState(DUMMY_STATE_READY);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useScore(0);
  const [score, setScore] = useAsyncState(0);
  const [memoryCards, setMemoryCards] = useState(cloneDeep(DUMMY_CARDS));
  const [memoryCardsStatus, setMemoryCardsStatus] = useState(cloneDeep(DUMMY_CARDS_STATUS));
  const [playerWonRound, setPlayerWonRound] = useAsyncState(false);


  function receiveMemoryCards(cards) {
    setMemoryCards(cards);

    let status = memoryCardsStatus.map((elem, index) => {
      return {
        id: elem.id,
        pressed: false
      }
    });

    setMemoryCardsStatus(status);
  }

  function handleMemoryCardClick(event) {
    console.log("click called.");
    console.log(playerWonRound);
    if (playerWonRound.current) {
      return;
    }
    // mark element as selected & update state
    let card = Utility.getMatchingParent(event.target, ".memory-card");

    let selected = parseInt(card.dataset.key);
    let lost = false;
    let newMemoryCardsStatus = memoryCardsStatus.map((elem, index) => {
      if (elem.id === selected) {
        // if pressed is already true here then we send the game to a game over state.
        if (elem.pressed) {
          lost = true;
        } else {
          elem.pressed = true;
          // setScore(score.current + 1);
          setScore(score + 1);
        }

      }
      return elem;
    })

    if (lost) {
      props.setGameState(GAME_STATE.GAMEOVER_LOSE);
      return null;
    }

    setMemoryCardsStatus(newMemoryCardsStatus);

    // now reshuffle the elements (from Fisher Yates)
    shuffleCards();
  }

  function shuffleCards() {
    let updatedMemoryCards = [...memoryCards];
    let currentIndex = memoryCards.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // destructure
      [updatedMemoryCards[currentIndex], updatedMemoryCards[randomIndex]] =
          [updatedMemoryCards[randomIndex], updatedMemoryCards[currentIndex]];
    }

    // TODO
    // DEBUG
    // Remove this later
    updatedMemoryCards = updatedMemoryCards.map((elem) => {
      return React.cloneElement(
        elem,
        {onClick: handleMemoryCardClick}
      );
    });

    setMemoryCards(updatedMemoryCards);
  }

  function playerIsReady() {
    setPlayerReady(true);
  }

  
  // TODO
  // Dummy useEffect, make sure to remove this later
  useEffect(() => {
    const withHandlers = DUMMY_CARDS.map(elem => {
      return React.cloneElement(
        elem,
        {onClick: handleMemoryCardClick}
      )
    });

    setMemoryCards(withHandlers);

    return () => {
      console.log("game component unmounted.")
    }
  }, []);

  if (!playerReady) {
    return (
      <Loading
        currentLevel={currentLevel}
        numCardsForLevel={props.levels[currentLevel]}
        playerReady={playerIsReady}
        passBackMemoryCards={receiveMemoryCards}
        memoryCardOnClick={handleMemoryCardClick}
      />
    )
  }

  return (
    <div>
      <p>Score: {score.current}</p>
      The game starts here.
      {memoryCards}
    </div>
  );
}

export default Game;
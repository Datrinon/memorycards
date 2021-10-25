import React, { useEffect, useState } from 'react';
import Loading from "./Loading";
import Timer from './Timer';

import GAME_STATE from '../Models/GameState';

import confetti from 'canvas-confetti';

import Utility from '../Util/utility';

import useAsyncState from '../hooks/useAsyncState';


function Game(props) {
  const [playerReady, setPlayerReady] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [memoryCards, setMemoryCards] = useState([]);
  const [memoryCardsStatus, setMemoryCardsStatus] = useAsyncState([]);
  const [playerWonRound, setPlayerWonRound] = useAsyncState(false);
  const [totalTime, setTotalTime] = useState(props.timePerCard * props.levels[currentLevel]);
  const [scoreIncAnim, setScoreIncAnim] = useState(0);

  function receiveMemoryCards(cards) {
    setMemoryCards(cards);

    let status = cards.map((elem, index) => {
      return {
        id: elem.props.id,
        pressed: false
      }
    });

    setMemoryCardsStatus(status);
  }

  function handleMemoryCardClick(event) {
    if (playerWonRound.current) {
      return;
    }
    // mark element as selected & update state
    let card = Utility.getMatchingParent(event.target, ".memory-card");

    let selected = parseInt(card.dataset.key);
    let lost = false;
    let newMemoryCardsStatus = memoryCardsStatus.current.map((elem, index) => {
      if (elem.id === selected) {
        // if pressed is already true here then we send the game to a game over state.
        if (elem.pressed) {
          lost = true;
        } else {
          elem.pressed = true;
          setRoundScore(prevRoundScore => prevRoundScore + 1);
          props.setCurrentScore(prevCurrentScore => prevCurrentScore + 1);
          playIncrementingAnimation();
        }

      }
      return elem;
    })

    if (lost) {
      endGame();
      return;
    }

    setMemoryCardsStatus(newMemoryCardsStatus);

    Utility.triggerAnimation(card, "blow-up", () => {
      // now reshuffle the elements (from Fisher Yates)
      shuffleCards();
    });
  }

  function playIncrementingAnimation() {
    setScoreIncAnim(1);
    const endAnimation = () => setScoreIncAnim(0);
    document
      .querySelector(".point-counter")
      .addEventListener("animationend", endAnimation);
  }

  function shuffleCards() {
    setMemoryCards(prevMemoryCards => {
      let updatedMemoryCards = [...prevMemoryCards];
      let currentIndex = prevMemoryCards.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        console.log(randomIndex);
        currentIndex--;
  
        // destructure
        [updatedMemoryCards[currentIndex], updatedMemoryCards[randomIndex]] =
            [updatedMemoryCards[randomIndex], updatedMemoryCards[currentIndex]];
      }

      return updatedMemoryCards;
    })
  }

  function playerIsReady() {
    setPlayerReady(true);
  }

  function advanceLevel() {
    setTotalTime(props.timePerCard * props.levels[currentLevel + 1]);
    setRoundScore(0);
    setPlayerReady(false);
    setCurrentLevel(currentLevel + 1);
    setPlayerWonRound(false);
    console.log("You should advance the level here and go back to loading.");
  }

  useEffect(() => {
    if (roundScore >= props.levels[currentLevel]) {
      setPlayerWonRound(true);
    } 
  });

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

  let levelPassed = null;
  console.log(roundScore >= props.levels[currentLevel]);

  if (roundScore >= props.levels[currentLevel]) {
    levelPassed = (
      <div className="round-win">
        <p className="round-win-message">🗹 Level {currentLevel + 1} Passed!</p>
        <button className="advance-round-button" onClick={advanceLevel}>Continue</button>
      </div>
    );
    // if the next level is undefined... that means the player was on the last level.
    if (props.levels[currentLevel + 1] === undefined) {
      levelPassed = (
      <div className="match-win round-win">
        <p className="round-win-message">Congratulations!</p>
        <p className="round-win-subtext">You beat the game. Impeccable memory!</p>
        <button className="end-game-button" onClick={props.setGameState.bind(null, GAME_STATE.MENU)}>Return to Main Menu</button>
      </div>
      )
      let canvas = document.querySelector(".confetti-canvas");
      canvas.classList.remove("no-display");
      let myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
      });

      myConfetti({
        particleCount: 100,
        spread: 160
      });

      canvas.onanimationend = () => {
        canvas.classList.add("no-display");
      }
    }
  }

  function endGame() {
    props.setGameState(GAME_STATE.GAMEOVER_LOSE);
  }

  return (
    <div className="game-area">
      <div className="hud">
        <p className="current-level">Lv. <span className="level">{currentLevel + 1}</span></p>
        <Timer timeleft={totalTime} endGame={endGame} playerWon={playerWonRound}/>
        <p className="total-score"><span className="point-counter" animation={scoreIncAnim}>{props.currentScore}</span> pts.</p>
      </div>
      <div className="cards">
        {memoryCards}
      </div>
      {levelPassed}
      <canvas className="confetti-canvas no-display"></canvas>
    </div>
  );
}

export default Game;
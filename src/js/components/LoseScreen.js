import GAME_STATE from "../Models/GameState";


function LoseScreen(props) {
  function onClickPlayAgain() {
    props.resetCurrentScore();
    props.setGameState(GAME_STATE.PLAYING);
  }
  return (
    <div className="game-over dialog-menu">
      <p>Game Over! Better luck next time!</p>
      <p>Your Score: {props.currentScore}</p>
      <button
        className="play-again"
        onClick={onClickPlayAgain}>
        Play Again
      </button>
      <button
        className="go-to-menu"
        onClick={props.setGameState.bind(null, GAME_STATE.MENU)}>
        Return to Main Menu</button>
    </div>
  );
}

export default LoseScreen;
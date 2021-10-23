import { useEffect, useState, useRef } from "react"
import useAsyncState from "../hooks/useAsyncState";

function Timer(props) {

  let [timeLeft, setTimeLeft] = useState(props.timeleft); 
  let [timerExpired, setTimerExpired] = useState(false);
  let tickerId = useRef(null);

  useEffect(() => {
    tickerId.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft > 0) {
          console.log("timer: " + (prevTimeLeft - 1));
          return prevTimeLeft - 1;
        } else {
          setTimerExpired(true);
        }
      }) 
    }, 1000);

    return () => {
      console.log("ending timer...");
      clearInterval(tickerId.current); 
    }
  }, []);

  useEffect(() => {
    if (timerExpired === true) {
      props.endGame();
    }
  }, [timerExpired]);

  if (props.playerWon.current) {
    console.log("ending timer in body...");
    console.log(props.playerWon.current);
    clearInterval(tickerId.current);
  }

  return (
    <div className="timer">
      <p className="time-left">{timeLeft}</p>
    </div>
  );
}

export default Timer;
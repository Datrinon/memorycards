import { useEffect, useState, useRef } from "react"

function Timer(props) {

  let [timeLeft, setTimeLeft] = useState(props.timeleft);
  let tickerId = useRef(null);

  useEffect(() => {
    tickerId.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft > 0) {
          console.log("timer: " + (prevTimeLeft - 1));
          return prevTimeLeft - 1;
        } else {
          props.endGame();
        }
      }) 
    }, 1000);

    return () => {
      console.log("ending timer...");
      clearInterval(tickerId.current); 
    }
  }, []);

  return (
    <p className="time-left">{timeLeft}</p>
  );
}

export default Timer;
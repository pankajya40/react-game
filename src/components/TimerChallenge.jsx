import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef();

  const [timeLeft, setTimeLeft] = useState(targetTime * 1000);

  const timeActive = timeLeft > 0 && timeLeft < targetTime * 1000;

  if (timeLeft <= 0) {
    clearInterval(timer.current);

    dialog.current.open();
  }
  function resetHandle() {
    setTimeLeft(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        result="lose"
        targetTime={targetTime}
        remainingTime={timeLeft}
        onReset={resetHandle}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime !== 1 && "s"}
        </p>
        <p>
          <button onClick={timeActive ? handleStop : handleStart}>
            {timeActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timeActive ? "active" : undefined}>
          {timeActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;

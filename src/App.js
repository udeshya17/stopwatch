import React, { useState, useEffect } from 'react';

function App() {

  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0); 
  const [button, setButton] = useState(true);

  const handleClick = () => {
    setButton(button => !button);
  }

  useEffect(() => {
    let timer;
    if (!button) {
      timer = setInterval(() => {
        setSecond(prevSecond => prevSecond + 1);
        if (second === 60) { 
          setSecond(0); 
          setMinute(prevMinute => prevMinute + 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer); 
  }, [button, second]); 

  const handleReset = () => {
    clearInterval(); 
    setSecond(0); 
    setMinute(0);
    setButton(button => !button) 
  }
  const formatTime = (minute, second) => {
    return `${minute}:${second < 10 ? `0${second}` : second}`;
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      Time: {formatTime(minute, second)}
      <br />
      <br />
      <button onClick={handleClick}>
        {button ? 'Start' : 'Stop'}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;

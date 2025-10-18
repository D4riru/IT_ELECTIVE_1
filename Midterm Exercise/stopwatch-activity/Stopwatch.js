'use client';

import { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = () => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Stopwatch</h1>
      <div style={styles.timeDisplay}>{formatTime()}</div>
      <div style={styles.buttonsContainer}>
        <button 
          style={{
            ...styles.button,
            ...(isRunning ? styles.stopButton : styles.startButton)
          }}
          onClick={handleStartStop}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button 
          style={styles.button} 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  timeDisplay: {
    fontSize: '3rem',
    fontFamily: 'monospace',
    backgroundColor: '#fff',
    padding: '1rem 2rem',
    borderRadius: '10px',
    border: '2px solid #ddd',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  buttonsContainer: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  stopButton: {
    backgroundColor: '#f44336',
    color: 'white',
  },
};

export default Stopwatch;
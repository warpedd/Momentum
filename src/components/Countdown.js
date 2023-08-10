import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const STATUS = {
  RUNNING: 'Running',
  STOPPED: 'Stopped',
}

const CountdownTimer = ({duration, onComplete, autoStart}) => {

    // State management function declarations
    const [secondsRemaining, setSecondsRemaining] = useState(duration)
    const [status, setStatus] = useState(STATUS.STOPPED)
  
    // Primitives for calculating remaining time
    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60
  
    // State change handlers
    const handleStart = () => {
      setStatus(STATUS.RUNNING)
    }
    
    const handleStop = () => {
      setStatus(STATUS.STOPPED)
    }

    const handleReset = () => {
      setStatus(STATUS.STOPPED)
      setSecondsRemaining(duration)
    }

    useInterval(
      () => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1)
        } else {
          setStatus(STATUS.STOPPED)
        }
      },
      status === STATUS.RUNNING ? 1000 : null,
      // passing null stops the interval
    )
    
    useEffect(() => {
      console.log('autoStart:', autoStart);
      if (autoStart) {
        handleStart(); // Start the timer automatically
      }
    }, [autoStart]);

    // Triggers reset of timer on duration prop change.
    // This occurs when a user changes the timer duration in the settings pane.
    useEffect(() => {
      console.log('duration changed:', duration);
      handleReset(); // Start the timer automatically
    }, [duration]);

    useEffect(() => {
      if (secondsRemaining === 0) {
          onComplete(); // Call the provided callback function
      }
    }, [secondsRemaining, onComplete]);
  
    return (
      <div className="countDown">
  
          <div className='timer-digits'>
              {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
              {twoDigits(secondsToDisplay)} 
          </div>
          
          <div className='control-panel'>
          
          {status === STATUS.STOPPED ? 
          <Button color={'#b04552'} text={'Start'} onClick={handleStart} /> : 
          <Button color={'#f18f60'} text={'Pause'} onClick={handleStop}
        />}
      
          <Button
            color={'#5976ba'}
            text={'Reset'}
            onClick={handleReset}
          />
          </div>
      </div>
    )
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, '0')

// Default values
CountdownTimer.defaultProps = {
    duration: 1500, // 25 minutes
}

// Checks input to duration
Button.propTypes = {
    text: PropTypes.number
}

export default CountdownTimer
import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import '../styles/Countdown.css'

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}

const CountdownTimer = ({duration}) => {
    const [secondsRemaining, setSecondsRemaining] = useState(duration)
    const [status, setStatus] = useState(STATUS.STOPPED)
  
    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60
  
    const handleStart = () => {
      setStatus(STATUS.STARTED)
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
      status === STATUS.STARTED ? 1000 : null,
      // passing null stops the interval
    )
    return (
      <div className="countDown">
  
          <div className='timer-digits'>
              {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
              {twoDigits(secondsToDisplay)} 
          </div>
          
          <div className='control-panel'>
          <Button
            color={'green'}
            text={'Start'}
            onClick={handleStart}
          />
  
          <Button
            color={'blue'}
            text={'Pause'}
            onClick={handleStop}
          />
  
          <Button
            color={'red'}
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
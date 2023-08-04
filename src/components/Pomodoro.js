import React, {useState} from 'react'
import Button from './Button'
import CountdownTimer from './Countdown'
import '../styles/Pomodoro.css'

const DisplayTimer = {
    POMODORO: 'Pomodoro',
    SHORTBREAK: 'Short Break',
    LONGBREAK: 'Long Break',
}

const Pomodoro = ({pomodoroDur, shortBreakDur, longBreakDur}) => {
    const[display, setDisplay] = useState(DisplayTimer.POMODORO)

    const switchPomodoro = () => {
        setDisplay(DisplayTimer.POMODORO)
    }

    const switchShortBreak = () => {
        setDisplay(DisplayTimer.SHORTBREAK)
    }

    const switchLongBreak = () => {
        setDisplay(DisplayTimer.LONGBREAK)
    }

    return(
        <div className='wrapper'>
            <div className="pomodoroTimer">
                <div className='timer-select-panel'>
                <Button
                    color={'red'}
                    text={'Pomodoro'}
                    onClick={switchPomodoro}
                />
  
                <Button
                    color={'lightblue'}
                    text={'Short Break'}
                    onClick={switchShortBreak}
                />
  
                <Button
                    color={'blue'}
                    text={'Long Break'}
                    onClick={switchLongBreak}
                />
            </div>
    
            { (display === DisplayTimer.POMODORO) && <CountdownTimer duration={pomodoroDur * 60}/> }
            { (display === DisplayTimer.SHORTBREAK) && <CountdownTimer duration={shortBreakDur * 60} /> }
            { (display === DisplayTimer.LONGBREAK) && <CountdownTimer duration={longBreakDur * 60}/> }
            </div>
        </div>
    )
}

export default Pomodoro
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
                    color={'#526449'}
                    text={'Pomodoro'}
                    onClick={switchPomodoro}
                />
  
                <Button
                    color={'#708557'}
                    text={'Short Break'}
                    onClick={switchShortBreak}
                />
  
                <Button
                    color={'#708d6e'}
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
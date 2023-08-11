import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import CountdownTimer from './Countdown';
import '../styles/Pomodoro.css';

const DisplayTimer = {
    POMODORO: 'Pomodoro',
    SHORTBREAK: 'Short Break',
    LONGBREAK: 'Long Break',
};

const Pomodoro = ({
    pomodoroDur,
    shortBreakDur,
    longBreakDur,
    pomodorosBeforeLongBreak,
    autoStartBreak,
    autoStartPomodoro,
}) => {
    const [display, setDisplay] = useState(DisplayTimer.POMODORO);
    const [completedPomodoros, setCompletedPomodoros] = useState(0);

    const switchPomodoro = () => {
        setDisplay(DisplayTimer.POMODORO);
    };

    const switchShortBreak = useCallback(() => {
        setDisplay(DisplayTimer.SHORTBREAK);
    }, []);

    const switchLongBreak = useCallback(() => {
        setDisplay(DisplayTimer.LONGBREAK);
    }, []);

    const switchToNextBreak = useCallback(() => {
        if (completedPomodoros > 0 && completedPomodoros % pomodorosBeforeLongBreak === 0) {
            switchLongBreak();
        } else {
            switchShortBreak();
        }
    }, [completedPomodoros, pomodorosBeforeLongBreak, switchLongBreak, switchShortBreak]);



    const handlePomodoroComplete = () => {
        setCompletedPomodoros((prevCount) => prevCount + 1);
        switchToNextBreak();
    };


    const handleTimerCompletion = () => {
        if (display === DisplayTimer.POMODORO) {
            handlePomodoroComplete();
        } else {
            switchPomodoro(); // Switch back to the pomodoro
        }
    };

    useEffect(() => {

        if (autoStartBreak && completedPomodoros > 0 && display !== DisplayTimer.POMODORO) {
            switchToNextBreak();
        } else if (autoStartPomodoro && display !== DisplayTimer.POMODORO) {
            switchPomodoro();
        }
    }, [completedPomodoros, pomodorosBeforeLongBreak, autoStartBreak, autoStartPomodoro, display, switchToNextBreak]);

    return (
        <div className='wrapper'>
            <div className='pomodoroTimer'>
                <div className='timer-select-panel'>
                    <Button color={'#526449'} text={'Pomodoro'} onClick={switchPomodoro} />
                    <Button color={'#708557'} text={'Short Break'} onClick={switchShortBreak} />
                    <Button color={'#708d6e'} text={'Long Break'} onClick={switchLongBreak} />
                </div>

                {display === DisplayTimer.POMODORO && (
                    <CountdownTimer
                        duration={pomodoroDur * 60}
                        onComplete={handleTimerCompletion}
                        autoStart={autoStartPomodoro}
                    />
                )}
                {display === DisplayTimer.SHORTBREAK && (
                    <CountdownTimer
                        duration={shortBreakDur * 60}
                        onComplete={handleTimerCompletion}
                        autoStart={autoStartBreak && autoStartPomodoro}
                    />
                )}
                {display === DisplayTimer.LONGBREAK && (
                    <CountdownTimer
                        duration={longBreakDur * 60}
                        onComplete={handleTimerCompletion}
                        autoStart={autoStartBreak && autoStartPomodoro}
                    />
                )}
            </div>
        </div>
    );
};

export default Pomodoro;
import React, { useState, useEffect } from 'react';
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

    const switchToNextBreak = () => {
        console.log('switchToNextBreak called');
        console.log('completedPomodoros:', completedPomodoros);
        if (completedPomodoros > 0 && completedPomodoros % pomodorosBeforeLongBreak === 0) {
            console.log('Switching to Long Break');
            switchLongBreak();
        } else {
            console.log('Switching to Short Break');
            switchShortBreak();
        }
    };
    

    const handlePomodoroComplete = () => {
        console.log("Pomodoro completed. Incrementing completedPomodoros...");
        setCompletedPomodoros((prevCount) => prevCount + 1);
        switchToNextBreak();
    };


    const handleTimerCompletion = () => {
        console.log("handleTimerCompletion called");
        if (display === DisplayTimer.POMODORO) {
            console.log("Pomodoro completed. Incrementing completedPomodoros...");
            handlePomodoroComplete();
        }else{
        console.log("Calling switchToNextBreak from handleTimerCompletion");
        switchPomodoro(); // Switch back to the pomodoro
        }
    };

    useEffect(() => {
    console.log("useEffect triggered");
    console.log("autoStartBreak:", autoStartBreak);
    console.log("autoStartPomodoro:", autoStartPomodoro);
    console.log("completedPomodoros:", completedPomodoros);
    console.log("pomodorosBeforeLongBreak:", pomodorosBeforeLongBreak);
    
        if (autoStartBreak && completedPomodoros > 0 && display !== DisplayTimer.POMODORO) {
            console.log("Calling switchToNextBreak");
            switchToNextBreak();
        } else if (autoStartPomodoro && display !== DisplayTimer.POMODORO) {
            console.log("Switching to Pomodoro");
            switchPomodoro();
        }
    }, [completedPomodoros, pomodorosBeforeLongBreak, autoStartBreak, autoStartPomodoro, display, switchToNextBreak]);
    

    const switchPomodoro = () => {
        setDisplay(DisplayTimer.POMODORO);
    };

    const switchShortBreak = () => {
        setDisplay(DisplayTimer.SHORTBREAK);
    };

    const switchLongBreak = () => {
        setDisplay(DisplayTimer.LONGBREAK);
    };

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
import React, {useState} from 'react';
import ReactPlayer from "react-player";
import useUser from '../hooks/useUser';
import "../styles/Music.css";

function Music() {
  const { user } = useUser();

  return (
    <div className='Music-box'>
      {user ? 
        <div className='music-list'>
          <ReactPlayer url="https://www.youtube.com/watch?v=MHb1m9pInEg&ab_channel=RelaxingGhibliPiano" loop={true} controls={true} width="500" height="50"/>
          <ReactPlayer url="https://www.youtube.com/watch?v=1wT3flPjQ2Y&ab_channel=TheSoulofWind" loop={true} controls={true} width="500" height="50"/>
          <ReactPlayer url="https://www.youtube.com/watch?v=L1cEMUJyi4o&ab_channel=RelaxingMoonMelody" loop={true} controls={true} width="500" height="50"/>
          <ReactPlayer url="https://www.youtube.com/watch?v=usPL0bPszDA&ab_channel=RelaxingMoonMelody" loop={true} controls={true} width="500" height="50"/>
          <ReactPlayer url="https://www.youtube.com/watch?v=QIGjYnzcRJM&ab_channel=Play-By-EarPianist" loop={true} controls={true} width="500" height="50"/>
          <ReactPlayer url="https://www.youtube.com/watch?v=7hNRbeFnRPA&ab_channel=1HourJapanMusic" loop={true} controls={true} width="500" height="50"/>
          <ReactPlayer url="https://www.youtube.com/watch?v=CiCw8MJ0JLc&ab_channel=JpopStore" loop={true} controls={true} width="500" height="50"/>
       </div>
       : <p className='music-login-message'>Please Login</p>}
    </div>
  );
}

export default Music;

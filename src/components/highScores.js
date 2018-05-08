import React, { Component } from 'react';
import highScores from './highScores.css'
import HighscoreEntries from './highscoreEntries';


function HighScores(props) {
  return (
    <div>
      <h1> High Scores</h1>
      <div className = "fullHighContainer">
        <HighscoreEntries/>
        <HighscoreEntries/>
        <HighscoreEntries/>
      </div>
    </div>
  )
}



export default HighScores;

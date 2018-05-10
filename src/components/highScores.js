import React, { Component } from 'react';
import highScores from './highScores.css'
import HighscoreEntries from './highscoreEntries';
import { firebase, firebaseDB } from '../firebase';


class HighScores extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  componentDidMount(){
    firebaseDB.ref('quiz').once('value', function(snapshot){
      console.log(snapshot.val());
    })
  }
  render (){
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
}



export default HighScores;

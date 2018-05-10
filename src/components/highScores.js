import React, { Component } from 'react';
import highScores from './highScores.css'
import HighscoreEntries from './highscoreEntries';
import { firebase, firebaseDB } from '../firebase';


class HighScores extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      highscore90: 0,
      highscore80: 0,
      highscore70: 0,

    };
  }
  componentDidMount() {
    firebaseDB.ref('quiz').once('value', (snapshot) => {
      var snapVal = snapshot.val();
      this.setState({ highscore90: snapVal.rock90.highscore, highscore80: snapVal.rock80.highscore, highscore70: snapVal.rock70.highscore})
    })
  }
  render (){
    let highscoreElementOne;
    let highscoreElementTwo;
    let highscoreElementThree
    if (this.state.highscore90 !== 0){
      highscoreElementOne = <HighscoreEntries highscores={this.state.highscore90}/>
      highscoreElementTwo = <HighscoreEntries highscores={this.state.highscore80}/>
      highscoreElementThree = <HighscoreEntries highscores={this.state.highscore70}/>
    } else {
      highscoreElementOne = <div> Error </div>
      highscoreElementTwo = <div> Error </div>
      highscoreElementThree = <div> Error </div>
    }
    return (
      <div>
        <h1> High Scores</h1>
        <div className = "fullHighContainer">
          {highscoreElementOne}
          {highscoreElementTwo}
          {highscoreElementThree}
        </div>
      </div>
    )
  }
}



export default HighScores;

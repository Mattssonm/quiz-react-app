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
      selfScore: {
        rock90: 0,
        rock80: 0,
        rock70: 0,
      }

    };
  }
  componentDidMount() {
    let user;
    if (firebase.auth().currentUser !== null){
      user = firebase.auth().currentUser.uid;
      firebaseDB.ref('user/' + user).once('value', (snapshot) => {
        var snapVal = snapshot.val();
        //this.setState({selfScore: {rock90: snapVal.quizzestaken.rock90.highscore, rock80: snapVal.quizzestaken.rock80.highscore, rock70: snapVal.quizzestaken.rock70.highscore}})
      })
    }
    firebaseDB.ref().once('value', (snapshot) => {
      var snapVal = snapshot.val();
      if (user ){
      this.setState({
        highscore90: snapVal.quiz.rock90.highscore,
        highscore80: snapVal.quiz.rock80.highscore,
        highscore70: snapVal.quiz.rock70.highscore,
      selfScore: {
        rock90: snapVal.user[user].quizzestaken.rock90.highscore,
        rock80: snapVal.user[user].quizzestaken.rock80.highscore,
        rock70: snapVal.user[user].quizzestaken.rock70.highscore,
      }})} else {
        this.setState({
          highscore90: snapVal.quiz.rock90.highscore,
          highscore80: snapVal.quiz.rock80.highscore,
          highscore70: snapVal.quiz.rock70.highscore,
        selfScore: {
          rock90: 0,
          rock80: 0,
          rock70: 0,
        }})
      }
    })

  }
  render (){
    let highscoreElementOne;
    let highscoreElementTwo;
    let highscoreElementThree
    if (this.state.highscore90 !== 0){
      highscoreElementOne = <HighscoreEntries highscores={this.state.highscore90} selfScore={this.state.selfScore.rock90} rockKind="90s"/>
      highscoreElementTwo = <HighscoreEntries highscores={this.state.highscore80} selfScore={this.state.selfScore.rock80} rockKind="80s"/>
      highscoreElementThree = <HighscoreEntries highscores={this.state.highscore70} selfScore={this.state.selfScore.rock70} rockKind="70s"/>
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

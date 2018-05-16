import React from 'react';
import './quizResult.css';

class QuizResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
    }
  }

componentDidMount(){
  if (this.props.currentUser.uid !== null){
    this.props.firebase.ref().once("value", (snapshot) => {
      this.setState({
        username: snapshot.val().user[this.props.currentUser.uid].name,
      })
  })
  }
}
  render() {
    if (this.props.currentUser == null){
      return (
        <div>
          <div className="totalPointsDiv">
            Points: {this.props.totalPoints}
          </div>
          <div className="rightAnswersDiv">
            Right answers: {this.props.rightAnswers} <br/>
            out of: {this.props.questionCount}
          </div>
          <button className="restartButton" onClick={() => {this.props.quitQuiz()}}>Restart</button>
        </div>
      )
    }
    let user = this.props.currentUser.uid;
    let takenQuiz = this.props.takenQuiz;
    function sortHighscores(firstObj,secondObj) {
      if (firstObj.points < secondObj.points)
        return -1;
      if (firstObj.points > secondObj.points)
        return 1;
      return 0;
    }
    //console.log(this.props.takenQuiz)
    this.props.firebase.ref().once("value", (snapshot) => {
      let username = snapshot.val().user[user].name;
      if (this.props.totalPoints > snapshot.val().user[user].quizzestaken[takenQuiz].highscore){
        this.props.firebase.ref("/user/" + user + "/quizzestaken/" + takenQuiz + "/highscore/").set(this.props.totalPoints);
      }
      let highScoresObj = [
        snapshot.val().quiz[takenQuiz].highscore.first,
        snapshot.val().quiz[takenQuiz].highscore.second,
        snapshot.val().quiz[takenQuiz].highscore.third,
        {
          name: username,
          picture: this.props.currentUser.photoURL,
          points: this.props.totalPoints,
        }
      ]
      highScoresObj.sort(sortHighscores);
      this.props.firebase.ref("/quiz/" + takenQuiz + "/highscore/").set({
        first: highScoresObj[3],
        second: highScoresObj[2],
        third: highScoresObj[1],
      })
    })
    if (this.state.username !== ""){
      this.props.firebase.ref("/user/" + user + "/quizzestaken/" + takenQuiz).push({points: this.props.totalPoints,
      rightAnswers: this.props.rightAnswers})
    }
    return (
      <div>
        <div className="loggedInInfo">
          <img src={this.props.currentUser.photoURL} alt="Logged in pic here"/>
          <div>
            {this.state.username}
          </div>
        </div>
        <div className="totalPointsDiv">
          Points: {this.props.totalPoints}
        </div>
        <div className="rightAnswersDiv">
          Right answers: {this.props.rightAnswers} <br/>
          out of: {this.props.questionCount}
        </div>
        <button className="restartButton" onClick={() => {this.props.quitQuiz()}}>Restart</button>
      </div>
    )
  }
}

export default QuizResult;

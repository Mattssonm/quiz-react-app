import React from 'react';

class QuizResult extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    let user = " + " + this.props.currentUser.uid;
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
      if (this.props.totalPoints > snapshot.val().user[user].quizzestaken[takenQuiz].highscore){
        this.props.firebase.ref("/user/" + user + "/quizzestaken/" + takenQuiz + "/highscore/").set(this.props.totalPoints);
      }
      let highScoresObj = [
        snapshot.val().quiz[takenQuiz].highscore.first,
        snapshot.val().quiz[takenQuiz].highscore.second,
        snapshot.val().quiz[takenQuiz].highscore.third,
        {
          name: this.props.currentUser.displayName,
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
      console.log(highScoresObj);
    })
    this.props.firebase.ref("/user/" + user + "/quizzestaken/" + takenQuiz).push({points: this.props.totalPoints,
    rightAnswers: this.props.rightAnswers})
    return (
      <div>
        <div className="loggedInInfo">
          <img src={this.props.currentUser.photoURL} alt="Logged in pic here"/>
          <div>
            {this.props.currentUser.displayName}
          </div>
        </div>
        <div className="totalPointsDiv">
          {this.props.totalPoints}
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

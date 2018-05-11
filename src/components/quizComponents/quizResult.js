import React from 'react';

class QuizResult extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    let user = " + " + this.props.currentUser.uid;
    let takenQuiz = this.props.takenQuiz;
    //console.log(this.props.takenQuiz)
    this.props.firebase.ref().once("value", function(snapshot){
      console.log(snapshot.val());
      console.log(snapshot.val().user[user]);
    })
    this.props.firebase.ref("/user/" + user).set({
      quizzestaken: {
        rock70: {
          highscore: 0,
        },
        rock80: {
          highscore: 0,
        },
        rock90: {
          highscore: 0,
        }
      }
    })
    this.props.firebase.ref("/user/" + user + "/quizzestaken/" + takenQuiz).push({
      points: this.props.points,
      rightAnswers: this.props.rightAnswers
    })
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

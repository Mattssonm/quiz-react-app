import React from 'react';

class QuizResult extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <div className="loggedInInfo">
          <img alt="Logged in pic here"/>
          <div>
            Player name
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

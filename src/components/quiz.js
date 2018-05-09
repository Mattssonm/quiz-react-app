import React from 'react';
import './quiz.css';
import QuizInfo from './quizComponents/quizInfo.js'
import Question from './quizComponents/question.js'
import ChooseCategory from './quizComponents/chooseCategory.js'

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizStarted: false,
      quizChoice: "",
    };
  }
  
  recieveAnswerSubmit = answer => {
    this.evaluateAnswer(answer);
  }
  
  evaluateAnswer = answer => {
    if (answer === "alt1") {
      console.log("evaluate Answer: correct answer")
    } else {
      console.log("evaluate Answer: wrong answer")
    }
  }
  
  handleCategoryChoice = category => {
    this.setState({
      quizChoice: category
    }, this.startQuiz)
  }
  
  startQuiz = () => {
    this.setState({
      quizStarted: true
    })
//    db.ref('/quiz/').once('value').then(function(snapshot) {
//      console.log(snapshot.val());
//    });
  }
  
  quitQuiz = () => {
    this.setState({
      quizStarted: false
    })
  }
  
  render() {
    //if quiz started, render question 
    return (
      <div>
        {this.state.quizStarted 
          ? 
            <div id="quizContainer">
            <button id="cancelBtn" className="btn" onClick={this.quitQuiz}>X</button>
            <QuizInfo points={100} />
            <Question sendAnswerSubmit={this.recieveAnswerSubmit} questObj={{
              answer: "Red Hot Chilli Peppers",
              question: "Which of the following bands was NOT one of the Big Four of Grunge in the 1990s?",
              wrongAlts: {
                alt1: "Alice in Chains",
                alt2: "Nirvana",
                alt3: "Pearl Jam"
              }
            }} />
            </div>
          //else show chooseCategory 
          :
            <div id="quizPicker">
              <ChooseCategory chooseCategory={this.handleCategoryChoice}/>
            </div>
        }
      </div>
      //on submit or no more time, highlight correct answer
    );
  }
}

export default Quiz;

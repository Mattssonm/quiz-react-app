import React from 'react';
import './quiz.css';
import QuizInfo from './quizComponents/quizInfo.js'
import Question from './quizComponents/question.js'
import ChooseCategory from './quizComponents/chooseCategory.js'
import { firebase, firebaseDB } from '../firebase';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizStarted: false,
      quizChoice: "",
      currentQuestion: {},
      questionNumber: 1,
      totalPoints: 0,
      combo: 1
    };
  }

  //recieve answer from question.js
  recieveAnswerSubmit = answer => {
    this.evaluateAnswer(answer);
    // Here you could store number of correct and wrong answers, if you like.
  }

  //check if answer is correct and handle points, combo
  evaluateAnswer = answer => {
    //if answer is correct add 100 points and multiply with current combo
    if (answer === "alt1") {
      this.setState({
        totalPoints: this.state.totalPoints + (100 * this.state.combo),
        combo: this.state.combo + 1,
      })
    //else remove 50 points and set combo back to 1
    } else {
      //but only if user has more than 0 points
      if (this.state.totalPoints > 0) {
        this.setState({
          totalPoints: this.state.totalPoints - 50,
          combo: 1
        })
      }
    }
  }

  //Recieve category choice from chooseCategory.js, change state and callback to startQuiz
  handleCategoryChoice = category => {
    this.setState({
      quizChoice: category
    }, this.startQuiz)
  }

  //Recieve nextQuestion call from question.js, change state and start new question
  nextQuestion = () => {
    console.log("nextQuestion runs");
    this.setState({
      questionNumber: this.state.questionNumber + 1
    }, this.startQuiz)
  }

  //in selected category, get current question number from db
  startQuiz = () => {
    firebaseDB.ref('/quiz/' + this.state.quizChoice + "/q" + this.state.questionNumber)
      .once('value').then(function(snapshot) {
      let snap = snapshot.val();

      this.setState({
      quizStarted: true,
      currentQuestion: {
        answer: snap.answer,
        question: snap.question,
        wrongAlts: {
          alt1: snap.wrongAlts.alt1,
          alt2: snap.wrongAlts.alt2,
          alt3: snap.wrongAlts.alt3
        }
      }
    })
    }.bind(this));
  }

  quitQuiz = () => {
    //reset quiz to initial state
    this.setState({
      quizStarted: false,
      quizChoice: "",
      currentQuestion: {},
      questionNumber: 1,
      totalPoints: 0,
      combo: 1
    })
  }

  recieveTimeIsUp = () => {
    console.log("timeIsUp")
  }

  render() {
    //if quiz started, render question
    if (this.state.quizStarted) {
      return (
        <div id="quizContainer">
          <button
            id="cancelBtn"
            className="btn"
            onClick={this.quitQuiz}>
          X</button>
          <QuizInfo
            points={this.state.totalPoints}
            combo={this.state.combo}
            sendTimeIsUp={this.recieveTimeIsUp}
            questionNumber={this.questionNumber}
          />
          <Question
            callNextQuestion={this.nextQuestion}
            sendAnswerSubmit={this.recieveAnswerSubmit}
            questObj={this.state.currentQuestion}
            questionNumber={this.state.questionNumber}
          />
        </div>
      )
    //else show chooseCategory
    } else {
      return (
        <div id="quizPicker">
          <ChooseCategory
            chooseCategory={this.handleCategoryChoice}
          />
        </div>
      )
    }
  }
} //class

export default Quiz;

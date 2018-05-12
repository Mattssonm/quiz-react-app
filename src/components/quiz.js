import React from 'react';
import './quiz.css';
import QuizInfo from './quizComponents/quizInfo.js'
import Question from './quizComponents/question.js'
import ChooseCategory from './quizComponents/chooseCategory.js'
import { firebase, firebaseDB } from '../firebase';
import QuizResult from './quizComponents/quizResult.js';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizStarted: false,
      quizChoice: "",
      currentQuestion: {},
      questionNumber: 1,
      totalPoints: 0,
      combo: 1,
      rightAnswers: 0,
      resultDisplay: false,
      timerIsRunning: false,
      remainingTime: 60,
    };
  }

  //recieve answer from question.js
  recieveAnswerSubmit = answer => {
    this.evaluateAnswer(answer);
    // Here you could store number of correct and wrong answers, if you like.
    this.stopTimer();
  }

  //check if answer is correct and handle points, combo
  evaluateAnswer = answer => {
    //if answer is correct add 100 points and multiply with current combo
    if (answer === "alt1") {
      this.setState({
        totalPoints: this.state.totalPoints + (100 * this.state.combo),
        combo: this.state.combo + 1,
        rightAnswers: this.state.rightAnswers + 1,
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
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      remainingTime: 60
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
    this.startTimer();
  }

  quitQuiz = () => {
    //reset quiz to initial state
    this.setState({
      quizStarted: false,
      quizChoice: "",
      currentQuestion: {},
      questionNumber: 1,
      totalPoints: 0,
      combo: 1,
      rightAnswers: 0,
      resultDisplay: false,
      timerIsRunning: false,
      remainingTime: 60,
    })
    localStorage.removeItem('quizState');
  }

  timeIsUp = () => {
    console.log("timeIsUp")
  }
  resultChange = () => {
    this.setState({resultDisplay: !this.state.resultDisplay});
    console.log("this is run");
  }

  //----------timer functions -------


  onTick = () => {
    if (this.state.timerIsRunning) {
      this.setState({
        remainingTime: this.state.remainingTime - 1
      })
    }
    //if 60 seconds has passed
    if (this.state.remainingTime === 0) {
      this.stopTimer();
      clearInterval(this.interval);
      this.timeIsUp();
    }
  }

  startTimer = () => {
    this.setState({
      timerIsRunning: true,
    })
  }

  stopTimer = () => {
    this.setState({
        timerIsRunning: false
      })
  }

  componentDidMount = () => {
    this.interval = setInterval(this.onTick, 1000);
    // var state = this.props.savedQuizState;
    // if (state) {
    //   this.setState(state);
    // }
    const loadedState = JSON.parse(localStorage.getItem('quizState'))
    this.setState(loadedState)
  }

  componentWillUnmount = () => {
    //this.props.sendQuizState(this.state)
    clearInterval(this.interval);
    localStorage.setItem('quizState', JSON.stringify(this.state))
  }

  render() {
    //if quiz started, render question
    if (this.state.quizStarted && !this.state.resultDisplay) {
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
            timer={this.state.remainingTime}
          />
          <Question
            callNextQuestion={this.nextQuestion}
            sendAnswerSubmit={this.recieveAnswerSubmit}
            questObj={this.state.currentQuestion}
            questionNumber={this.state.questionNumber}
            resultChange={this.resultChange}
          />
        </div>
      )
    //else show chooseCategory
  } else if (this.state.resultDisplay) {
    return (
      <div id="quizResults">
        <QuizResult totalPoints={this.state.totalPoints}
        rightAnswers={this.state.rightAnswers}
        questionCount={this.state.questionNumber}
        quitQuiz={this.quitQuiz}
        currentUser={firebase.auth().currentUser}
        takenQuiz={this.state.quizChoice}
        firebase={firebase.database()}/>
      </div>
      )
    }
    else {
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

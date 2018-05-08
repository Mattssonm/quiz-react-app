import React from 'react';
import './quiz.css';
import QuizInfo from './quizComponents/quizInfo.js'
import Question from './quizComponents/question.js'
import ChooseCategory from './quizComponents/chooseCategory.js'

let quizHtml = (
  <div id="quizContainer">
    <button id="cancelBtn" className="btn">X</button>
    <QuizInfo points={100} />
    <Question questObj={{
      answer: "Red Hot Chilli Peppers",
      question: "Which of the following bands was NOT one of the Big Four of Grunge in the 1990s?",
      wrongAlts: {
        alt1: "Alice in Chains",
        alt2: "Nirvana",
        alt3: "Pearl Jam"
      }
    }} />
  </div>
);

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizChoice: "",
    };
  }
  render() {
    return (
      <div id="quizPicker">
        <ChooseCategory />
      </div>
      //on submit or no more time, highlight correct answer
    );
  }
}

export default Quiz;

import React from 'react';
import PropTypes from 'prop-types';
import { cL, tC } from 'react-classlist-helper';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      selectedOption: "",
      buttonTxt: "Submit",
      styleWrong: "",
      styleCorrect: "",
      flexOrderAlt1: 4,
      flexOrderAlt2: 3,
      flexOrderAlt3: 2,
      flexOrderAlt4: 1
    })
  }

  handleButton = () => {
    if (this.state.buttonTxt === "Submit") {
      this.props.sendAnswerSubmit(this.state.selectedOption);
      this.changeButtonOnAnswerSent();
    //else if all questions has been answered see results
    } else if (this.state.buttonTxt === "See Results") {
      //quiz.js will show result component
      this.props.resultChange();
    //else buttonTxt === "Next"
    } else {
      this.shuffleFlexOrder();
      this.props.callNextQuestion();
      this.hideCorrectAnswer();
      this.setState({
        selectedOption: "",
        buttonTxt: "Submit"
      })
    }
  }

  changeButtonOnAnswerSent = () => {
    //if this is the last question
    if (this.props.questionNumber === 3) {
      this.setState({
        buttonTxt: "See Results"
      })
    //else change buttonTxt to "Next"
    } else {
      this.setState({
        buttonTxt: "Next"
      })
    }
    this.showCorrectAnswer();
  }

  handleAltChange = event => {
    this.setState({
      selectedOption: event.target.id
    })
  }

  showCorrectAnswer = () => {
    this.setState({
      styleWrong: "wrong",
      styleCorrect: "correct"
    })
  }

  hideCorrectAnswer = () => {
    this.setState({
      styleWrong: "",
      styleCorrect: ""
    })
  }

  checkRemainingTime = () => {
    if (this.props.remainingTime === 0) {
      this.changeButtonOnAnswerSent();
      this.props.sendAnswerSubmit("Time is up");
    }
  }

  assignFlexOrder = val => {
    return ({
      flexOrder1: val === 1,
      flexOrder2: val === 2,
      flexOrder3: val === 3,
      flexOrder4: val === 4
    })
  }

  shuffleArr = array => {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  shuffleFlexOrder = () => {
    let arr = [1, 2, 3, 4];
    let shuffledArr = this.shuffleArr(arr);

    //set each flexOrderAlt state with numbers from 1 to 4
    this.setState({
      flexOrderAlt1: shuffledArr[0],
      flexOrderAlt2: shuffledArr[1],
      flexOrderAlt3: shuffledArr[2],
      flexOrderAlt4: shuffledArr[3]
    })
  }

  componentDidMount = () => {
    this.interval = setInterval(this.checkRemainingTime, 1000);
    this.shuffleFlexOrder();
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h3>{this.props.questObj.question}</h3>
        <div className="altDiv">
          <input
            type="radio"
            name="alts"
            id="alt1"
            checked={this.state.selectedOption === 'alt1'}
            onChange={this.handleAltChange}
            />
          <label
            className={cL("choice", this.state.styleCorrect, this.assignFlexOrder(this.state.flexOrderAlt1))}
            htmlFor="alt1">{this.props.questObj.answer}
          </label>
          <input
            type="radio"
            name="alts"
            id="alt2"
            checked={this.state.selectedOption === 'alt2'}
            onChange={this.handleAltChange}
            />
          <label
            className={cL("choice", this.state.styleWrong, this.assignFlexOrder(this.state.flexOrderAlt2))}
            htmlFor="alt2">{this.props.questObj.wrongAlts.alt1}
          </label>
          <input
            type="radio"
            name="alts"
            id="alt3"
            checked={this.state.selectedOption === 'alt3'}
            onChange={this.handleAltChange}
            />
          <label
            className={cL("choice", this.state.styleWrong, this.assignFlexOrder(this.state.flexOrderAlt3))}
            htmlFor="alt3">{this.props.questObj.wrongAlts.alt2}
          </label>
          <input
            type="radio"
            name="alts"
            id="alt4"
            checked={this.state.selectedOption === 'alt4'}
            onChange={this.handleAltChange}
            />
          <label
            className={cL("choice", this.state.styleWrong, this.assignFlexOrder(this.state.flexOrderAlt4))}
            htmlFor="alt4">{this.props.questObj.wrongAlts.alt3}
          </label>
        </div>
        <input
          onClick={this.handleButton}
          value={this.state.buttonTxt}
          className="btn"
          type="submit"
        />
      </div>
    );
  }
}

Question.propTypes = {
  questObj: PropTypes.object.isRequired
}

export default Question;

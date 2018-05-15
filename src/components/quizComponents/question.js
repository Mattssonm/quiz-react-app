import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      selectedOption: "",
      buttonTxt: "Submit",
      styleWrong: "",
      styleCorrect: ""
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
      styleWrong: "choice wrong",
      styleCorrect: "choice correct"
    })
  }

  hideCorrectAnswer = () => {
    this.setState({
      styleWrong: "choice",
      styleCorrect: "choice"
    })
  }

  checkRemainingTime = () => {
    if (this.props.remainingTime === 0) {
      this.changeButtonOnAnswerSent();
      this.props.sendAnswerSubmit("Time is up");
    }
  }

  shuffle = array => {
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

  componentDidMount = ()  => {
    this.interval = setInterval(this.checkRemainingTime, 1000);


      let altArray = [
        (
          <div>
            <input
              type="radio"
              name="alts"
              id="alt1"
              checked={this.state.selectedOption === 'alt1'}
              onChange={this.handleAltChange}
              />
            <label
              className={this.state.styleCorrect}
              htmlFor="alt1">{this.props.questObj.answer}
            </label>
          </div>
        ),
        (
          <div>
            <input
              type="radio"
              name="alts"
              id="alt2"
              checked={this.state.selectedOption === 'alt2'}
              onChange={this.handleAltChange}
              />
            <label
              className={this.state.styleWrong}
              htmlFor="alt2">{this.props.questObj.wrongAlts.alt1}
            </label>
          </div>
        ),
        (
          <div>
            <input
              type="radio"
              name="alts"
              id="alt3"
              checked={this.state.selectedOption === 'alt3'}
              onChange={this.handleAltChange}
              />
            <label
              className={this.state.styleWrong}
              htmlFor="alt3">{this.props.questObj.wrongAlts.alt2}
            </label>
          </div>
        ),
        (
          <div>
            <input
              type="radio"
              name="alts"
              id="alt4"
              checked={this.state.selectedOption === 'alt4'}
              onChange={this.handleAltChange}
              />
            <label
              className={this.state.styleWrong}
              htmlFor="alt4">{this.props.questObj.wrongAlts.alt3}
            </label>
          </div>
        )
      ]
      let shuffledArray = this.shuffle(altArray);
      let mapArray = shuffledArray.map((item, index) =>
        <div key={index}>{item}</div>
      )
      this.setState({mapArray: mapArray})
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h3>{this.props.questObj.question}</h3>
        <div className="altDiv">
          {this.state.mapArray}
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

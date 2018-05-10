import React from 'react';
import PropTypes from 'prop-types';

class QuizInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerIsRunning: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  }
  //start interval on mount
  componentDidMount() {
    this.interval = setInterval(this.onTick, 100);
    this.startTimer();
  }

  //reset on unmount
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onTick = () => {
    if (this.state.timerIsRunning) {
      let now = Date.now();
      this.setState({
        //To calculate time more accurately, use Date to calulate how many milliseconds has passed on each tick
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      })
    }
    //if 60 seconds has passed
    if (this.state.elapsedTime > 60000) {
      this.stopTimer();
      clearInterval(this.interval);
      this.TimeIsUp();
    }
  }

  //Inform quiz.js that the time is up
  TimeIsUp = () => {
    this.props.sendTimeIsUp();
  }

  startTimer = () => {
    this.setState({
      timerIsRunning: true,
      //set first previousTime
      previousTime: Date.now()
    })
  }

  stopTimer = () => {
    this.setState({
        timerIsRunning: false
      })
  }
  render() {
    let seconds = Math.floor(this.state.elapsedTime / 1000)
    return (
      <ul className="quizInfo">
        <li>Totalpoints: {this.props.points}</li>
        <li>Combo: {this.props.combo}X</li>
        <li>Timer: {60 - seconds}</li>
      </ul>
    );
  }
}

QuizInfo.propTypes = {
  points: PropTypes.number.isRequired,
  combo: PropTypes.number
}

QuizInfo.defaultProps = {
  combo: 1
}

export default QuizInfo;

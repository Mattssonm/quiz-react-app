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
  componentDidMount() {
    this.interval = setInterval(this.onTick, 100);
    this.startTimer();
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  onTick = () => {
    if (this.state.timerIsRunning) {
      let now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      })
    }
    //if 60 seconds has passed
    if (this.state.elapsedTime > 60000) {
      this.stopTimer();
      clearInterval(this.interval);
    }
  }
  
  startTimer() {
    this.setState({
      timerIsRunning: true,
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
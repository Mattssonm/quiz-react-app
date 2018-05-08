import React from 'react';
import PropTypes from 'prop-types';

class QuizInfo extends React.Component {
//  constructor(props) {
//    super(props);
//  }
  render() {
    return (
      <ul className="quizInfo">
        <li>Totalpoints: {this.props.points}</li>
        <li>Combo: {this.props.combo}X</li>
        <li>Timer: 60</li>
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
import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
//  constructor(props) {
//    super(props);
//  }
  render() {
    return (
      <div>
        <h3>{this.props.questObj.question}</h3>
        <div className="altDiv">
          <input type="radio" name="alts" id="alt1"/>
          <label className="choice" htmlFor="alt1">{this.props.questObj.answer}</label>
          <input type="radio" name="alts" id="alt2"/>
          <label className="choice" htmlFor="alt2">{this.props.questObj.wrongAlts.alt1}</label>
          <input type="radio" name="alts" id="alt3"/>
          <label className="choice" htmlFor="alt3">{this.props.questObj.wrongAlts.alt2}</label>
          <input type="radio" name="alts" id="alt4"/>
          <label className="choice" htmlFor="alt4">{this.props.questObj.wrongAlts.alt3}</label>
        </div>
        <input  className="btn" type="submit" value="Submit"/>
      </div>
    );
  }
}

Question.propTypes = {
  questObj: PropTypes.object.isRequired
}

export default Question;
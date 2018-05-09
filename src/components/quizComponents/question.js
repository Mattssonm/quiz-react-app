import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      selectedOption: ""
    })
  }
  handleSubmit = () => {
    this.props.sendAnswerSubmit(this.state.selectedOption);
  }
  
  handleAltChange = event => {
    this.setState({
      selectedOption: event.target.id
    })
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
            className="choice" 
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
            className="choice" 
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
            className="choice" 
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
            className="choice" 
            htmlFor="alt4">{this.props.questObj.wrongAlts.alt3}
          </label>
        </div>
        <input onClick={this.handleSubmit} className="btn" type="submit" value="Submit"/>
      </div>
    );
  }
}

Question.propTypes = {
  questObj: PropTypes.object.isRequired
}

export default Question;
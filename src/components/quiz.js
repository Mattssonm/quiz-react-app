import React from 'react';
import './quiz.css';

function Quiz(props) {
  return (
    <div id="quizContainer">
      <h3>What is the answer to this question?</h3>
      <ul className="quizInfo">
        <li>Timer: 60</li>
        <li>Totalpoints: 100</li> 
        <li>Combo: 3 x</li>
      </ul>
      <div className="altDiv">
        <input type="radio" name="alts" id="alt1"/>
        <label htmlFor="alt1">alt1</label>
        <input type="radio" name="alts" id="alt2"/>
        <label htmlFor="alt2">alt2</label>
        <input type="radio" name="alts" id="alt3"/>
        <label htmlFor="alt3">alt3</label>
        <input type="radio" name="alts" id="alt4"/>
        <label htmlFor="alt4">alt4</label>
      </div>
      <button id="cancelBtn" className="btn">X</button>
      <input  className="btn" type="submit" value="Submit"/>
    </div>

    //on submit or no more time, highlight correct answer
  )
}

export default Quiz;

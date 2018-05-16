import React from 'react';

class ChooseCategory extends React.Component {

  clickHandler = event => {
    let eventTarget = event.target.innerHTML;
    let choice;
    if (eventTarget === "90's Rock") {
      choice = "rock90";
    } else if (eventTarget === "80's Rock") {
      choice = "rock80";
    } else {
      choice = "rock70";
    }
    this.props.chooseCategory(choice);
  }
  render() {
    return (
      <div id="categoryContainer">
        <h3>Choose Rock Quiz!</h3>
        <div onClick={this.clickHandler} className="choice">90's Rock</div>
        <div onClick={this.clickHandler} className="choice">80's Rock</div>
        <div onClick={this.clickHandler} className="choice">70's Rock</div>
      </div>
    )
  }
}

export default ChooseCategory;

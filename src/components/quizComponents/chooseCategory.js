import React from 'react';

let clickHandler = event => {
  console.log(event.target.innerHTML);
}

function chooseCategory(props) {
  return (
    <div id="categoryContainer">
      <h3>Choose Rock Quiz!</h3>
      <div onClick={clickHandler} className="choice">90's Rock</div>
      <div onClick={clickHandler} className="choice">80's Rock</div>
      <div onClick={clickHandler} className="choice">70's Rock</div>
    </div>
  )
}

export default chooseCategory;
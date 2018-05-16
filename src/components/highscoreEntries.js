import React, { Component } from 'react';

class HighscoreEntries extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
        <div className = "highContainer"> {this.props.rockKind} Rock Highscores
          <div className = "highScoreOne">
            <img src={this.props.photo} alt=""/>
            <div className = "nameDiv">
              {this.props.highscores.first.name}
            </div>
            <div className = "pointDiv">
            points: {this.props.highscores.first.points}
            </div>
          </div>
          <div className = "highScoreOne">
            <img src={this.props.photo} alt=""/>
            <div className = "nameDiv">
              {this.props.highscores.second.name}
            </div>
            <div className = "pointDiv">
            points: {this.props.highscores.second.points}
            </div>
          </div>
          <div className = "highScoreOne">
            <img src={this.props.photo} alt=""/>
            <div className = "nameDiv">
              {this.props.highscores.third.name}
            </div>
            <div className = "pointDiv">
            points: {this.props.highscores.third.points}
            </div>
          </div>
          <div className = "selfDiv">
            Own: {this.props.selfScore}
          </div>
        </div>
    )}
}

export default HighscoreEntries;

import React, { Component } from 'react';

class HighscoreEntries extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
        <div className = "highContainer"> {this.props.rockKind} Rock Highscores
          <div className = "highScoreOne">
            <img src="https://i.pinimg.com/736x/5b/91/00/5b91000392c81eb72e26ba7253e3d502--manga-anime-anime-art.jpg" alt=""/>
            <div className = "nameDiv">
              {this.props.highscores.first.name}
            </div>
            <div className = "pointDiv">
            points: {this.props.highscores.first.points}
            </div>
          </div>
          <div className = "highScoreOne">
            <img src="https://i.pinimg.com/736x/5b/91/00/5b91000392c81eb72e26ba7253e3d502--manga-anime-anime-art.jpg" alt=""/>
            <div className = "nameDiv">
              {this.props.highscores.second.name}
            </div>
            <div className = "pointDiv">
            points: {this.props.highscores.second.points}
            </div>
          </div>
          <div className = "highScoreOne">
            <img src="https://i.pinimg.com/736x/5b/91/00/5b91000392c81eb72e26ba7253e3d502--manga-anime-anime-art.jpg" alt=""/>
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

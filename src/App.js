import React, { Component } from 'react';
import ReactDOM from  'react-dom';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';

// COMPONENTS
import Home from './components/home';
import Quiz from './components/quiz';
import HighScores from './components/highScores'
import Profile from './components/profile';

const App = () => {
  return (
    <BrowserRouter>
      <div className="maincontainer">
        <header id="headercontainer">
          <NavLink to="/"><button className="button">Home</button></NavLink>
          <NavLink to="/quiz"><button className="button">Quiz</button></NavLink>
          <NavLink to="/highScores"><button className="button">High Scores</button></NavLink>
          <NavLink to="/profile"><button className="button">Profile</button></NavLink>
          <hr/>
        </header>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/quiz" component={Quiz}/>
          <Route path="/highScores" component={HighScores}/>
          <Route path="/profile" component={Profile}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}


export default App;

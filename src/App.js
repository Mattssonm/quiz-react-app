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
      <div className="container">
        <header id="header">
          <NavLink to="/" className="nav">Quiz</NavLink>
          <NavLink to="/highScores" className="nav">High Scores</NavLink>
          <NavLink to="/profile" className="nav">Profile</NavLink>
          <a href="#" className="nav">Login</a>
        </header>
        <Switch>
        <div id="main">
          <Route path="/" exact component={Quiz}/>
          <Route path="/highScores" component={HighScores}/>
          <Route path="/profile" component={Profile}/>
        </div>
        </Switch>
      </div>
    </BrowserRouter>
  )
}


export default App;

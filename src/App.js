import React from 'react';
//import ReactDOM from  'react-dom';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';

// COMPONENTS
import Quiz from './components/quiz';
import HighScores from './components/highScores'
import Profile from './components/profile';
import Login from './components/login';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <header id="header">
          <NavLink to="/" className="nav">Quiz</NavLink>
          <NavLink to="/highScores" className="nav">High Scores</NavLink>
          <NavLink to="/profile" className="nav">Profile</NavLink>
          <NavLink to="/login" className="nav">Login</NavLink>
        </header>
        <div id="main">
          <Switch>
            <Route path="/" exact component={Quiz}/>
            <Route path="/highScores" component={HighScores}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}


export default App;

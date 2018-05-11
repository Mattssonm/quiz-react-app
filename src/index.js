import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

//import ReactDOM from  'react-dom';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import { firebase, firebaseDB, googleAuth } from './firebase';

// COMPONENTS
import Quiz from './components/quiz';
import HighScores from './components/highScores'
import Profile from './components/profile';
import Login from './components/login';

const App = (props) => {

    const handleChange = (e) => {
        e.preventDefault();
        
        if(props.user === null){
            firebase.auth().signInWithPopup(googleAuth)
            .then((result) => {
                console.log(result.user)
                const user = result.user;
               /*  this.setState({
                    user
                })
           firebaseDB.ref('user').once("value", (snapshot) => {
    
                let obj = snapshot.val();
    
                for(let prop in obj) {
                    this.setState(prevState => ({
                        users: [...prevState.users, prop]
                    }))
                }
            })*/
               firebaseDB.ref(`user/ + ${user.uid}`).set({
                   id: user.uid,
                   name: user.displayName,
                   email: user.email,
                   photo: user.photoURL
                }); // I added user
                console.log('user added');
                console.log('logged in')
            })
        } else {
            firebase.auth().signOut()
           console.log('logged out')
        }
        console.log(props.user)
    }
   
  return (
     
    <BrowserRouter>
      <div className="container">
        <header id="header">
          <NavLink to="/" className="nav">Quiz</NavLink>
          <NavLink to="/highScores" className="nav">High Scores</NavLink>
          <NavLink to="/profile" className="nav">Profile</NavLink>
          <div className="nav" onClick={handleChange}>Login</div>
        </header>
        <div id="main">
          <Switch>
            <Route path="/" exact component={Quiz}/>
            <Route path="/highScores" component={HighScores}/>
  <Route path="/profile" render={(user) => <Profile {...props} user={props.user}/>}/>
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}   


firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})
registerServiceWorker();

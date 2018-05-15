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
    this.state = {
        allUsers: [],
        id: ''
    }

    const handleChange = (e) => {
        e.preventDefault();

        if(props.user === null){
            firebase.auth().signInWithPopup(googleAuth)
            .then((result) => {

                let id = '';
                let allUsers = [];
                const user = result.user;
                // Fetch all uid from firebase
                firebaseDB.ref("user").once("value", (snapshot) => {

                    let obj = snapshot.val()

                    for (let prop in obj) {
                        // add all keys to array
                       allUsers.push(prop);

                    }

                    for (let i = 0; i < allUsers.length; i++) {
                        // check if key matches in database
                        if (user.uid === allUsers[i]) {
                          id = allUsers[i];
                        }

                      }

                      if ( id === '') {
                          // if key doesnt exist add userinfo to firebase
                        firebaseDB.ref(`user/${user.uid}`).set({
                            id: user.uid,
                            name: user.displayName,
                            email: user.email,
                            photo: user.photoURL,
                            quizzestaken: {
                              rock90: {
                                highscore: 0,
                              },
                              rock80: {
                                highscore: 0,
                              },
                              rock70: {
                                highscore: 0,
                              }
                            }
                         });
                         console.log('user added');
                    } else {
                        console.log('logged in')
                    }
                })

            })
        } else {
            firebase.auth().signOut()
        }

    }

    const showLogin = () => {
        if(props.user !== null) {
            return (
                <div>
                    <NavLink to="/profile" className="nav">Profile</NavLink>
                    <div className="nav" onClick={handleChange}>Logout</div>
                </div>
            )
        } else {
            return (
                <div className="nav" onClick={handleChange}>Login</div>
            )
        }
    }

  return (

    <BrowserRouter>
      <div className="container">
        <header id="header">
          <NavLink to="/" className="nav">Quiz</NavLink>
          <NavLink to="/highScores" className="nav">High Scores</NavLink>

          {showLogin()}
        </header>
        <div id="main">
          <Switch>
            <Route path="/" exact component={Quiz}/>
            <Route path="/highScores" component={HighScores}/>
  <Route path="/profile" render={(user,history) => <Profile {...props} user={props.user} history={props.location}/>}/>
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

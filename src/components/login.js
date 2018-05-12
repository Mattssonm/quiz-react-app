import React, { Component } from 'react';
import { firebase, googleAuth, firebaseDB } from '../firebase';

class Login extends Component {

    state = {
        user:null,
        displayName: '',
        email: '',
        photo: '',
        id: '',
        users: []
    }

    signIn = () => {
        firebase.auth().signInWithPopup(googleAuth)
        .then((result) => {
            console.log(result.user)
            const user = result.user;
            this.setState({
                user
            })
        firebaseDB.ref('user').once("value", (snapshot) => {

            let obj = snapshot.val();

            for(let prop in obj) {
                this.setState(prevState => ({
                    users: [...prevState.users, prop]
                }))
            }
        })
           firebaseDB.ref(`user/ + ${user.uid}`).set({
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
                 },
               }
            }); // I added user
            console.log('user added');
        })


    }

    signOut = () => {
        firebase.auth().signOut()
        this.setState({
            user: null
        })
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
         if(user){
             this.setState({
                 user
             })
         }

        })
    }

    render(){
        return(
            <div>
                <h1>Sign up</h1>
                <h2>Welcome {this.state.displayName}</h2>
                <div>{this.state.email}</div>
                { this.state.user ?
                    <button onClick={ this.signOut }>Logout</button>
                    :
                    <button onClick={ this.signIn }> Login </button>
                }
            </div>
        )
    }
}

export default Login;

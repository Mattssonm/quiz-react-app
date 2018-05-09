import React, { Component } from 'react';
import { firebase, googleAuth } from '../firebase';

class Login extends Component {

    state = {
        status:false,
        displayName: '',
        email: '',
        photo: '',
        id: ''
    }

    signIn = () => {
        firebase.auth().signInWithPopup(googleAuth)
    }

    signOut = () => {
        firebase.auth().signOut()
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            this.setState({
                status: user ? false : true,
                displayName: user.displayName,
                email: user.email,
                photo: user.photoURL,
                id: user.uid
            })
        
        })
    }

    render(){
        return(
            <div>
                <h1>Sign up</h1>
                <h2>Welcome {this.state.displayName}</h2>
                <div>{this.state.email}</div>
                <img src={this.state.photo} />
                { this.state.status ?
                    <button onClick={ this.signIn }>Login</button>
                    :
                    <button onClick={ this.signOut }> Logout </button>
                }
            </div>
        )
    }
}

export default Login;
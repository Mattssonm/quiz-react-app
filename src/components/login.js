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
import React, { Component } from 'react';
import { firebase, firebaseDB } from '../firebase';
class Profile extends Component {
  state = {
    user: '',
    photo: '',
    topScore70: '',
    topScore80: '',
    topScore90: ''
  }

  
   displayName = () =>{
    if(this.props.user !== null){
      this.setState=({
        user: this.props.user,
        photo: this.props.photoURL
      })
      return this.props.user.displayName
    } else {
      
      return "please login"
    }
  }
   changeName = () => {
    let user = this.props.user.uid;
      firebaseDB.ref('/user/' + user).update({
        name: "jonas"})
        console.log('changed name')

}

    handleChange = (event) => {
        this.setState({user: event.target.value});
    
    }

  render() {
    console.log(this.props.user.uid)
    return (
      <div>
        <img src={this.state.photo} alt="avatar"/>
        <br />
        <br />
        <br />
        <div>{this.state.user}</div>
        <label>
            Name:
        <input type="text" name="name" value={this.state.user} onChange={this.handleChange}/>
        </label>
        <br />
        <button onClick={this.changeName}>Change Username </button>
        
          <div>HighScore</div>
          <div>90's Rock</div>
          <ul>
            <li>Topscore: 0  Quizzez Taken: 2134</li>
            <li>Rank: 120</li>
          </ul>
          <div>80's Rock</div>
          <ul>
            <li>Topscore: 5  Quizzez Taken: 0</li>
            <li>Unranked</li>
          </ul>
          <div>70's Rock</div>
          <ul>
            <li>Topscore: 0  Quizzez Taken: 2134</li>
            <li>Rank: 120</li>
          </ul>
      </div>
    );
  }
}

export default Profile;
import React, { Component } from 'react';
import { firebase, firebaseDB } from '../firebase';
import './profile.css';
class Profile extends Component {
  state = {
    user: '',
    photo: '',
    email: '',
    topScore70: '',
    topScore80: '',
    topScore90: '',
    status: true
  }

   changeName = (e) => {
     e.preventDefault();
     
      this.setState({
        status: false
      })


}
  updateName = (e) => {
    e.preventDefault();
    let user = this.props.user.uid;
      firebaseDB.ref('/user/' + user).update({
        name: this.state.user})
        console.log('changed name')
        this.setState({
          status: true
        })
  }

    handleChange = (event) => {
        this.setState({user: event.target.value});

    }
    componentWillMount = () => {
      let user = this.props.user.uid;
      firebaseDB.ref('/user/').child(user).on('value', (snapshot) => {
        let obj = snapshot.val();
        console.log(obj)
        this.setState({
          user: obj.name,
          photo: obj.photo,
          email: obj.email
        })
      })
    }

    componentWillUnmount = () => {
      this.setState({
        photo: '',
        user: '',
        email: ''
      })
    }

  render() {
    //console.log(this.state.user)
    return (
      <div className="wrapper">
          <form className="myForm">
             <div className="message">
                 Avatar
                <img src={this.state.photo} alt="avatar"/>
            </div>
            <div className="contact">
            <div>Name</div>
            { this.state.status ? (
                      <div>
                      <p>{this.state.user}</p>
                      <button onClick={ this.changeName }> Change name </button>
                      </div>
                    ) :
                    <div>
                    <input type="text" value={this.state.user} onChange={this.handleChange}/>
                    <button onClick={ this.updateName }> Done </button>
                    </div>
                }
              
              <br />
              Email
             <div>{this.state.email}</div>
            </div>

              </form>
{/*               <div className="highScore">HighScore
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
                  </div> */}
      </div>
    );
  }
}

export default Profile;

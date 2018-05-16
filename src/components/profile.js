import React, { Component } from 'react';
import { firebase, firebaseDB } from '../firebase';
import './profile.css';
class Profile extends Component {
  state = {
    user: '',
    photo: '',
    email: '',
    topScore70: '',
    taken70: '',
    topScore80: '',
    taken80: '',
    topScore90: '',
    taken90: '',
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
      firebaseDB.ref('/user/' + user).on('value', (snapshot) => {
        let obj = snapshot.val();
        //console.log(obj)
        this.setState({
          user: obj.name,
          photo: obj.photo,
          email: obj.email
        })
      })
      firebaseDB.ref(`/user/${user}/quizzestaken/rock70/`).orderByChild("points").once('value', (snapshot) => {
       let ohSnap = snapshot.val();
       //console.log(ohSnap);
       const data = [];
        snapshot.forEach((childSnapshot)=>{
         data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    const last = data[data.length - 1]
    //console.log(last)
    this.setState({
      topScore70: last.points,
      taken70: data.length-1
    })

      })
      firebaseDB.ref(`/user/${user}/quizzestaken/rock80/`).orderByChild("points").once('value', (snapshot) => {
        let ohSnap = snapshot.val();
        //console.log(ohSnap);
        const data = [];
         snapshot.forEach((childSnapshot)=>{
          data.push({
             ...childSnapshot.val(),
             id:childSnapshot.key
         })
     });
     const last = data[data.length - 1]
     //console.log(last)
     this.setState({
       topScore80: last.points,
       taken80: data.length-1
     })

       })
       firebaseDB.ref(`/user/${user}/quizzestaken/rock90/`).orderByChild("points").once('value', (snapshot) => {
        let ohSnap = snapshot.val();
        //console.log(ohSnap);
        const data = [];
         snapshot.forEach((childSnapshot)=>{
          data.push({
             ...childSnapshot.val(),
             id:childSnapshot.key
         })
     });
     const last = data[data.length - 1]
     //console.log(last)
     this.setState({
       topScore90: last.points,
       taken90: data.length-1
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
    console.log(this.state);
    return (
      <div>
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
                    <button onClick={ this.updateName }> Update </button>
                    </div>
                }

              <br />
              Email
             <div>{this.state.email}</div>
            </div>

              </form>

      </div>
      <div className="wrapper">
      <div className="highScore">
        <span>HighScore</span>
                <div>90's Rock</div>
                  <ul>
                    <li>Topscore: {this.state.topScore90}  </li>
                    <li>Rank: 120</li>
                    <li>Quizzez Taken: {this.state.taken90}</li>
                  </ul>
                  <div>80's Rock</div>
                  <ul>
                    <li>Topscore: {this.state.topScore80} </li>
                    <li>Unranked</li>
                    <li>Quizzez Taken: {this.state.taken80}</li>
                  </ul>
                  <div>70's Rock</div>
                  <ul>
                    <li>Topscore: {this.state.topScore70}  </li>
                    <li>Rank: 120</li>
                    <li>Quizzez Taken: {this.state.taken70}</li>
                  </ul>
                  </div>
      </div>
      </div>
    );
  }
}

export default Profile;

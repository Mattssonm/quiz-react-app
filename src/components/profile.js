import React, { Component } from 'react';

class Profile extends Component {


  render() {
    return (
      <div>
        {this.props.user.displayName}
      </div>
    );
  }
}

export default Profile;
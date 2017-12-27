import React, { Component } from 'react';
// import fire from '../fire';

class startGame extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().toISOString().slice(0, 10);
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }
  componentWillMount(){
    console.log('this.profile', this.profile);
  }
  render() {
    return (
      <div>
      <p>So this is the startGame</p>
      </div>
    );
  }
}

export default startGame;

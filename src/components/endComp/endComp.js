import React, { Component } from 'react';
import fire from '../../fire';
import styles from '../startGame/startGame.css';

class endComp extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().toISOString().slice(0, 10);
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.savedResults = [];
    this.state = {arrLoaded: false};
  }
  componentWillMount() {
    // call down paper based on your IDX
    let yourPaperRef = fire.database().ref(this.todaysDate + '/papers/' + this.profile.currentPosition);
    // find out what position player is in array
    yourPaperRef.once('value', (snap) => {
      snap.forEach(paper => {
        this.savedResults.push(paper.val());
      });
      this.setState({arrLoaded: true});
    });
    console.log('this.savedResults! --->', this.savedResults);
  }

  render() {
    const { arrLoaded } = this.state;
    if (arrLoaded) {
      return (
        <div className={styles.startGame}>
          <h2>So...</h2>
          <h4>{this.savedResults[1].his_name}</h4>
          <p>met</p>
          <h4>{this.savedResults[2].her_name}</h4>
          <p>at</p>
          <h4>{this.savedResults[3].they_met}</h4>
          <p>He said:</p>
          <h4>{this.savedResults[4].he_said}</h4>
          <p>She said:</p>
          <h4>{this.savedResults[5].she_said}</h4>
          <p>The broke up because:</p>
          <h4>{this.savedResults[6].they_broke_up}</h4>
        </div>
      );
    } else {
      return (
        <div className={styles.startGame}>Loading...</div>
      );
    }
  }
}

export default endComp;

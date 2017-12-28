import React, { Component } from 'react';
import fire from '../../fire';
import styles from './startGame.css';

class startGame extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().toISOString().slice(0, 10);
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }
  componentWillMount() {
    console.log('this.profile', this.profile);

    // listen for child of players/ change, loop all players, break if ready_for_next === false
    let playersRef = fire.database().ref(this.todaysDate + '/players');

    playersRef.on('value', snapshot => {
      let readyCount = 0;
      console.log('snapshot of each', snapshot.val());
      snapshot.forEach(player => {
        if(player.val().ready_for_next === true) {
          readyCount = readyCount + 1;
        }
      });
      console.log('this.readyCount', this.readyCount);
      console.log('this.profile.totalPlayers', this.profile.totalPlayers);
      if (readyCount === this.profile.totalPlayers) {
        alert('all players have answered!');
      }
    });
  }

  markAllReadyForNextFalse () {

  }

  markIndividualReady(e) {
    e.preventDefault();
    fire.database().ref(this.todaysDate + '/players/' + this.profile.id + '/ready_for_next').set(true);
    // question logic
    // find out what position player is in array
    // save position in localStorage
    // write to next one's ledger

  }

  render() {
    return (
      <div className={styles.startGame}>
      <form onSubmit={this.markIndividualReady.bind(this)}>
        <label htmlFor="question">A guy's name</label>
        <input id="question" type="text" ref={ el => this.inputEl = el }/>
        <input type="submit" value="Ready for next step"/>
      </form>
      </div>
    );
  }
}

export default startGame;

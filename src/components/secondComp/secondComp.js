import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import fire from '../../fire';
import styles from '../startGame/startGame.css';

class secondComp extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().toISOString().slice(0, 10);
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.savedArr = [];
    this.state= {submittedTwo: false, redirectTwo: false};
  }
  componentWillMount() {
    console.log('this.profile', this.profile);

    // listen for child of players/ change, loop all players, break if ready_for_next === false
    let playersRef = fire.database().ref(this.todaysDate + '/players');
    // find out what position player is in array
    playersRef.once('value', (snap) => {
      snap.forEach((player, i) => {
        this.savedArr.push(player.key);
      });
    });

    playersRef.on('value', snapshot => {
      let readyCount = 0;
      console.log('snapshot of each', snapshot.val());
      snapshot.forEach(player => {
        if(player.val().ready_for_next === true) {
          readyCount = readyCount + 1;
        }
      });
      console.log('readyCount', readyCount);
      console.log('this.profile.totalPlayers', this.profile.totalPlayers);
      if (readyCount === this.profile.totalPlayers) {
        console.log('all questions answered!');
        fire.database().ref(this.todaysDate + '/players/' + this.profile.id + '/ready_for_next').set(false);
        this.setState({ redirectTwo : true});
      }
    });
  }

  pushToAdjacentPlayerQuestionArr(idx, entry) {
    const stage = 2;

    let nextPlayersIDXRef;
    if((idx + stage) % this.savedArr.length === 0) {
    	nextPlayersIDXRef = this.savedArr.length;
    } else {
    	nextPlayersIDXRef = (idx + stage) % this.savedArr.length;
    }

    console.log('nextPlayersIDXRef --->', nextPlayersIDXRef);
    const papersRefToWrite = fire.database().ref(this.todaysDate + '/papers/' + nextPlayersIDXRef).push();
    papersRefToWrite.set({secondRound: entry})

    // let lsCache = this.profile;
    // lsCache.currentPosition = idx;
    // localStorage.setItem('profile', JSON.stringify(lsCache));

  }

  markIndividualReady(e) {
    e.preventDefault();
    this.setState({submittedTwo: true});
    // console.log('index! -->', this.savedArr.indexOf(this.profile.id));
    // pass position and val to function to place in papers
    this.pushToAdjacentPlayerQuestionArr((this.savedArr.indexOf(this.profile.id) + 1), this.inputEl.value);
    fire.database().ref(this.todaysDate + '/players/' + this.profile.id + '/ready_for_next').set(true);
  }

  render() {
    const { redirectTwo } = this.state;
    if (redirectTwo) {
       return <Redirect to='/three' />;
     }
    return (
      <div className={styles.startGame}>
      <form className={this.state.submittedTwo ? styles.clearOut : ''} onSubmit={this.markIndividualReady.bind(this)}>
        <label htmlFor="question">A girl's name</label>
        <input id="question" type="text" ref={ el => this.inputEl = el }/>
        <input type="submit" disabled={this.state.submittedTwo} value="Ready for next step"/>
      </form>
      {this.state.submittedTwo ? <p className={styles.blink_me}>Waiting for other players to finish, idiots ....</p> : null }
      </div>
    );
  }
}

export default secondComp;

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
    this.state= {submitted: false, redirectTwo: false};
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
      console.log('readyCount', readyCount);
      console.log('this.profile.totalPlayers', this.profile.totalPlayers);
      if (readyCount === this.profile.totalPlayers) {
        console.log('all questions answered!');
        this.setState({ redirect : true});
      }
    });
  }

  pushToAdjacentPlayerQuestionArr(idx, entry) {
    const stage = 2;
    // let lsCache = this.profile;
    // lsCache.currentPosition = idx;
    // localStorage.setItem('profile', JSON.stringify(lsCache));

    let nextPlayersIDXRef;
    if (idx + stage > this.savedArr.length) {
      // REMAINDER TO TAP ON THE BACK
      nextPlayersIDXRef = this.savedArr[idx + stage - this.savedArr.length];
    } else {
      nextPlayersIDXRef = this.savedArr[idx + stage]
    }

    // write to next player's ledger
    // let nextPlayersIDXRef = this.savedArr[idx + stage] || this.savedArr[0 + stage];
    console.log('nextPlayersIDXRef --->', nextPlayersIDXRef);
    let nextPlayersDBRef = fire.database().ref(this.todaysDate + '/players/' + nextPlayersIDXRef + '/questions').push();
    nextPlayersDBRef.set(entry);
  }

  markIndividualReady(e) {
    e.preventDefault();
    this.setState({submitted: true});
    // question logic
    let playerPos = fire.database().ref(this.todaysDate + '/players');
    // find out what position player is in array
    playerPos.once('value', (snap) => {
      snap.forEach(player => {
        this.savedArr.push(player.key);
      });
    });
    // console.log('index! -->', this.savedArr.indexOf(this.profile.id));
    // save position in localStorage
    this.pushToAdjacentPlayerQuestionArr(this.savedArr.indexOf(this.profile.id), this.inputEl.value);

    fire.database().ref(this.todaysDate + '/players/' + this.profile.id + '/ready_for_next').set(true);
  }

  render() {
    const { redirectTwo } = this.state;
    if (redirectTwo) {
       return <Redirect to='/three' />;
     }
    return (
      <div className={styles.startGame}>
      <form className={this.state.submitted ? styles.clearOut : ''} onSubmit={this.markIndividualReady.bind(this)}>
        <label htmlFor="question">A girl's name</label>
        <input id="question" type="text" ref={ el => this.inputEl = el }/>
        <input type="submit" disabled={this.state.submitted} value="Ready for next step"/>
      </form>
      {this.state.submitted ? <p className={styles.blink_me}>Waiting for other players to finish, idiots ....</p> : null }
      </div>
    );
  }
}

export default secondComp;

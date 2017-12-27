import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import fire from '../fire';

class DefaultLanding extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().toISOString().slice(0, 10);
    this.state = { players: [], redirect: false };
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let playersRef = fire.database().ref(this.todaysDate + '/players');
    playersRef.on('child_added', snapshot => {

      let player = { name: snapshot.val().name, id: snapshot.key };
      this.setState({players: [...this.state.players, player]});

      console.log('players ===> ', this.state.players);
    });
    // if game started
    let gameOn = fire.database().ref(this.todaysDate + '/gameStarted');
    gameOn.on('value', snapshot => {
      if (snapshot.val() === true) {
        console.log('game started!');
        this.setState({ redirect : true});
      }
    });
  }
  addPlayer(e) {
    e.preventDefault();
    /* Send the message to Firebase */
    let playerRef = fire.database().ref(this.todaysDate + '/players').push();
    playerRef.set({name: this.inputEl.value});

    if(!localStorage.getItem('profile')) {
        localStorage.setItem('profile', JSON.stringify({name: this.inputEl.value, id: playerRef.key}))
    }
    this.inputEl.value = ''; // <- clear the input
  }

  startGame(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref(this.todaysDate + '/').update({gameStarted: true});
    this.setState({ redirect : true});
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
       return <Redirect to='/start' />;
     }

    return (
      <div style={{textAlign:'center'}}>
        <h2>
        Please enter your name
        </h2>
        <form onSubmit={this.addPlayer.bind(this)}>
          <input type="text" ref={ el => this.inputEl = el }/>
          <input type="submit"/>
          { this.state.players.length ? <p style={{textAlign:'center'}}>People ready</p> : null }
          <ul>
            { /* Render the list of messages */
              this.state.players.map( player => <li key={player.id}>{player.name}</li> )
            }
          </ul>
        </form>
        { this.state.players.length ? <form onSubmit={this.startGame.bind(this)}>
          <input type="submit" value="start game"/>
        </form> : null }
      </div>

    );
  }
}

function mapStateToProps({players}) {
  return { players };
}

export default connect(mapStateToProps)(DefaultLanding);

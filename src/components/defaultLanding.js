import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../fire';
class DefaultLanding extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().toISOString().slice(0, 10);
    this.state = { players: [] };
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let playersRef = fire.database().ref('players').orderByKey().limitToLast(100);
    playersRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let player = { text: snapshot.val(), id: snapshot.key };
      this.setState({ players: [player].concat(this.state.players) });
    })
  }
  addPlayer(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('players').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  render() {
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
            this.state.players.map( player => <li key={player.id}>{player.text}</li> )
          }
        </ul>
      </form>
      </div>
    );
  }
}

function mapStateToProps({activeGame}) {
  return { activeGame };
}

export default connect(mapStateToProps)(DefaultLanding);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../fire';
class DefaultLanding extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().toISOString().slice(0, 10);
    this.state = { games: [] };
  }
  componentWillMount() {
    // let gamesRef = fire.database().ref('games/' + this.todaysDate);
    // gamesRef.on('child_added', snapshot => {
    // })
  }
  addGame(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('games/' + this.todaysDate + '/players/').push({
      name: this.inputEl.value, age: '30'
    })
    // fire.database().ref('games/' + this.todaysDate).set({
    //     players: {name: this.inputEl.value, age: '30'}
    // });
    this.inputEl.value = ''; // <- clear the input
  }

  render() {
    return (
      <div style={{textAlign:'center'}}>
      <h2>
      Please enter your name
      </h2>
      <form onSubmit={this.addGame.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        { this.state.games.length ? <p style={{textAlign:'center'}}>People ready</p> : null }
        <ul>
          { /* Render the list of messages */
            this.state.games.map( game => <li key={game.id}>{game.text}</li> )
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

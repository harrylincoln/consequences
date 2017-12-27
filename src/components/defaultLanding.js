import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../fire';

class DefaultLanding extends Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }
  componentWillMount() {
    let gamesRef = fire.database().ref('games').orderByKey().limitToLast(100);
    gamesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let game = { text: snapshot.val(), id: snapshot.key };
      this.setState({ games: [game].concat(this.state.games) });
    })
  }
  addGame(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('games').push(this.inputEl.value);
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

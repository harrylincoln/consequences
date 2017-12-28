import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import defaultLanding from './defaultLanding';
import startGame from './startGame/startGame';

import Header from './Header';
import Routes from './Routes';

const Dashboard = () => <h2>Dashboard</h2>;


class App extends Component {

  componentDidMount() {
    // console.log('this.props', this.props);
    // this.props.listenStart();
    // this.props.createGame();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={defaultLanding} />
            <Route exact path="/start" component={startGame} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/routes" component={Routes} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);

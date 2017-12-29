import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import defaultLanding from './defaultLanding';
import startGame from './startGame/startGame';
import secondComp from './secondComp/secondComp';
import thirdComp from './thirdComp/thirdComp';
import fourthComp from './fourthComp/fourthComp';
import fifthComp from './fifthComp/fifthComp';
import sixComp from './sixComp/sixComp';
import endComp from './endComp/endComp';

import styles from 'materialize-css/dist/css/materialize.min.css';

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
      <div className={styles.container}>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={defaultLanding} />
            <Route exact path="/start" component={startGame} />
            <Route exact path="/two" component={secondComp} />
            <Route exact path="/three" component={thirdComp} />
            <Route exact path="/four" component={fourthComp} />
            <Route exact path="/five" component={fifthComp} />
            <Route exact path="/six" component={sixComp} />
            <Route exact path="/end" component={endComp} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/routes" component={Routes} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);

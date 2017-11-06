import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Plot from './views/plot';

class Routes extends Component {
  render() {
    return (
      <Route exact path="/routes/plot" component={Plot} />
    );
  }
};

export default Routes;

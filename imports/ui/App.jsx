import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import Home from './Home.jsx';

import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory()

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Route path="/:id?" component={Home} />
        </div>
      </Router>
    )
  }
}






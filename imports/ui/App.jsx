import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import Home from './Home.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory()

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
      <Router history={browserHistory}>
        <div>
          <Route path="/:id?" component={Home} />
        </div>
      </Router>
      </MuiThemeProvider>
    )
  }
}






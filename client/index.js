import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { App } from './components/common';
import { LoginForm, SignupForm } from './components/forms';
import { Dashboard } from './components/user';
import { requireAuth } from './components/hocs';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    // Send cookie along with backend server request
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: record => record.id
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
        </Switch>
      </App>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux';

import { Router } from 'react-router';

import { store, history, apolloClient } from './store';
import routes from './routes';

import registry from 'app-registry';
import { ApolloProvider } from 'react-apollo';

store.dispatch({ type: 'APP:INIT' });

ReactDOM.render(
  <ApolloProvider store={store} client={apolloClient}>
    <Router history={history}>
      {routes}
    </Router>
  </ApolloProvider>
  , document.getElementById('app')
);

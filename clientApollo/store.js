import logMiddleware from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';

import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

// import reducers from './reducers';
const reducers = {}; // To remove
// import sagas from './sagas';

// const sagaMiddleware = createSagaMiddleware();

const networkInterface = createNetworkInterface('/graphql');

networkInterface.use([{
  applyMiddleware(req, next) {
    console.log(req);
    next();
  }
}]);

export const apolloClient = new ApolloClient({
  networkInterface,
  // dataIdFromObject: (result) => {
  //   console.log('dataIdFromObject');
  //   console.log(result);
  // }
});

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer,
  apollo: apolloClient.reducer()
}));

export const history = useRouterHistory(createHashHistory)({ queryKey: false });

const middlewares = [];

/* eslint-disable no-undef */
// if (ENV.logDispatcher) {
middlewares.push(logMiddleware());
middlewares.push(apolloClient.middleware());
// }
/* eslint-enable no-undef */
// middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));
export const store = compose(
  applyMiddleware.apply(null, middlewares)
)(createStore)(reducer);

// sagaMiddleware.run(sagas);
syncHistoryWithStore(history, store);

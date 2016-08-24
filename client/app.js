import 'babel-polyfill';

import createHashHistory from 'history/lib/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import Router from 'react-router/lib/Router';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import useRelay from 'react-router-relay';

import routes from './routes';

// Socket layer
import SocketIONetworkLayer from './network/SocketIONetworkLayer';
import io from 'socket.io-client';
const socket = io();
Relay.injectNetworkLayer(new SocketIONetworkLayer(socket));

// ------------

const history = useRouterHistory(createHashHistory)();

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

// A wrapper to create a Relay container
function createRelayContainer(Component, props) {
  if (Relay.isContainer(Component)) {
    // Construct the RelayQueryConfig from the route and the router props.
    const { name, queries } = props.route;
    const { params } = props;

    return (
      <Relay.RootContainer
        Component={Component}
        renderLoading={() => <div>Loading...</div>}
        renderFetched={(data) => {
          if (props.route.localLayout) {
            const LocalContainer = props.route.localLayout;
            return (
              <LocalContainer {...props} {...props.route}><Component {...props} {...data} /></LocalContainer>
            );
          }
          return <Component {...props} {...data} />;
        }}
        route={{ name, params, queries }}
      />
    );
  }
  return <Component {...props}/>;
}

ReactDOM.render(
  <Router
    history={history}
    routes={routes}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
    createElement={createRelayContainer}
  />,
  mountNode
);

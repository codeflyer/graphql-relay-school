import { graphql } from 'graphql';

import * as events from './events';
import { schema } from './schemas/schema';

export const connect = socket => {

  let subscriptions = {};
  const rootValue = {  };
  const contextValue = {  };

  socket.on('disconnect', () => {
    console.log('--------------------DISCONNECT--------------------');
    Object.values(subscriptions).forEach(({ channel, listener }) =>
      events.unsubscribe(channel, listener)
    )
  });

  socket.on('graphql/queries', requests => {
    console.log('--------------------Query--------------------');
    requests.forEach(request => {
      execute(schema, request.query, rootValue, contextValue, request.variables).then(response => {
        socket.emit('graphql/query/response', {
          id: request.id,
          ...response
        });
      });
    });
  });

  socket.on('graphql/mutation', request => {
    console.log('--------------------Mutation--------------------');
    execute(schema, request.query, rootValue, contextValue, request.variables).then(response => {
      socket.emit('graphql/mutation/response', {
        id: request.id,
        ...response
      });
    });
  });

  socket.on('graphql/subscription', async request => {
    console.log('--------------------Subscription--------------------');
    const channel = await events.channelForSubscription(request);
    const listener = ev => handleSubscription(request, ev);

    subscriptions[request.id] = {
      channel,
      listener
    };

    events.subscribe(channel, listener);
  });

  socket.on('graphql/subscription/unsubscribe', ({ id }) => {
    console.log('--------------------Subscription unsubscribe--------------------');
    const { channel, listener } = subscriptions[id];
    events.unsubscribe(channel, listener);
    delete subscriptions[id];
  });

  const handleSubscription = (request, event) => {
    console.log('--------------------Subscription response--------------------');
    execute(schema, request.query, { ...rootValue, event }, contextValue, request.variables).then(response => {
      socket.emit('graphql/subscription/response', {
        id: request.id,
        ...response
      });
    });
  }
};

const execute = (schema, query, rootValue, contextValue, variables, operationName) => {
  return graphql(schema, query, rootValue, contextValue, variables, operationName)
    .catch(error => ({ errors: [error] }));
};

import config from 'config';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schemas/schema';
import IO from 'socket.io';

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  // console.log('Do a request');
  // setTimeout(next, 2000);
  next();
});

app.use('/graphql', graphqlHTTP({
  schema
}));

import { connect } from './socket';

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  if (config.server.useSocket) {
    console.log('SocketIO: enabled');
    const io = IO(server);
    io.on('connect', connect);
  } else {
    console.log('SocketIO: disabled');
  }

  console.log('GraphQL listening at http://%s:%s', host, port);
});

// import './subscriptions';

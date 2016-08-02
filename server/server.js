import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schemas/schema';

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log('Do a request');
  // setTimeout(next, 2000);
  next();
});

app.use('/graphql', graphqlHTTP({
  schema
}));

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});

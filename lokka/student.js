const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('http://localhost:3000/graphql')
});

// watch the query
const watchHandler = (err, payload) => {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log(payload);
};

const query = `
   { student(id: 10) {
    name {title, first, last}
   } }
`;
// object pass as the query variables
const vars = {};
client.watchQuery(query, vars, watchHandler);

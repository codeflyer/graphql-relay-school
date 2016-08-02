# GraphQL step by step

### Preparare il server
`server.js`

### Hello world schema, resituire un valore statico

```
let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: function() {
          return 'Hello World!!';
        },
        description: 'This is the hello world'
      }
  })
});
```

### Prima mutation, counter++

```
let count = 0;
let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        resolve: function() {
          return getUserCount();
        },
        description: 'This is the counter'
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateCount: {
        type: GraphQLInt,
        description: 'Updates the count',
        resolve: function() {
          count += 1;
          return count;
        }
      }
    }
  })
});
```

### Creare un dataset da randomuser.me
Tramite il servizio https://randomuser.me creare un JSON contenente gli utenti. Aggiungere un campo id


### Creare lo schema per lo user. { id, email}
Creare uno schema di base per l'utente

```
export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    }
  })
});
```

* Recuperare il primo utente

```
{ user { name {title, first}}}
```

```
...
   query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...
      user: {
        type: User,
        resolve: function() {
          return getUsers()[0];
        },
        description: 'Get the first user'
      }
      ...
    }
  })
```

### Aggiungere un campo complesso { name }

```
const NameType = new GraphQLObjectType({
  name: 'name',
  fields: () => ({
    title: {
      type: GraphQLString
    },
    first: {
      type: GraphQLString
    },
    last: {
      type: GraphQLString
    }
  })
});

...
fields: () => ({
    ...
    name: {
      type: NameType
    },
    email: {
      type: GraphQLString
    },
...
```

### Finalizzare lo schema
Completare lo schema per l'utente

### Restituire la lista degli utenti

```
{ user { name {title, first}}}
```

```
...
   query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...
      users: {
        type: new GraphQLList(User),
        resolve: function() {
          return getUsers();
        },
        description: 'Time to get the users'
      }
      ...
    }
  })
```

### Parametri nelle query, limitare i risultati

```
users: {
  type: new GraphQLList(User),
  args: {
    count: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  },
  resolve(parent, { offset = 0, count = 10}) {
    return getUsers(offset, count);
  },
  description: 'Time to get the users'
}
```
   
### Parametri nelle query, ricerca di un utente specifico

```
{ user(id: 5) { name {title, first}}}
```

```
user: {
  type: User,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: function(parent, { id }) {
    return getUser(id);
  },
  description: 'Get the user'
},
```


### Aggiungere parametri alla mutation
```
mutation RootMutationType { updateCount(add: 3) }
```

```
updateCount: {
  type: GraphQLInt,
  description: 'Updates the count',
  args: {
    add: {
      type: GraphQLInt
    }
  },
  resolve: function(parent, {add = 1}) {
    count += add;
    return count;
  }
}
```
 
 
 
#Problemi con Relay
 
 * I fragment vanno gestiti con la getFragment, passando direttamente l'elenco dei parametri si ottiene un warning.
 * Error: field type must be Input Type - cannot pass qlType into mutation

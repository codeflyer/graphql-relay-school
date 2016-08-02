import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const NameType = new GraphQLObjectType({
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

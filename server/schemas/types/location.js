import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const LocationType = new GraphQLObjectType({
  name: 'location',
  fields: () => ({
    street: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    },
    postcode: {
      type: GraphQLString
    }
  })
});

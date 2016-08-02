import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const PictureType = new GraphQLObjectType({
  name: 'picture',
  fields: () => ({
    large: {
      type: GraphQLString
    },
    medium: {
      type: GraphQLString
    },
    thumbnail: {
      type: GraphQLString
    }
  })
});

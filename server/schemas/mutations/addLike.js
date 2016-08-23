// USE this version in Apollo

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType
} from 'graphql';

import { addLike } from '../../repositories/persons';
import { Person } from '../instances/person';

const AddLikeToPersonInput = new GraphQLInputObjectType(
  {
    name: 'AddLikeInput',
    fields: {
      personId: {
        type: GraphQLInt
      }
      // ,
      // clientMutationId: {
      //   type: GraphQLString
      // }
    }
  }
);

const AddLikeToPersonPayload = new GraphQLObjectType(
  {
    name: 'AddLikePayload',
    fields: {
      person: {
        type: Person.type
      }
      // ,
      // clientMutationId: {
      //   type: GraphQLString
      // }
    }
  }
);

export const AddLike = {
  type: AddLikeToPersonPayload,
  description: 'Updates the count',
  args: {
    personId: {
      type: GraphQLID
    }
  },
  resolve: (parent, { personId }) => {
    console.log('Like to: ', personId);
    return addLike({ personId });
  }
};

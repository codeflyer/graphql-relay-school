import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

import { addLike } from '../../repositories/persons';
import { Person } from '../instances/person';

const AddLikeToPersonInput = new GraphQLInputObjectType(
  {
    name: 'AddLikeToPersonInput',
    fields: {
      personId: {
        type: GraphQLString
      },
      clientMutationId: {
        type: GraphQLString
      }
    }
  }
);

const AddLikeToPersonPayload = new GraphQLObjectType(
  {
    name: 'AddLikeToPersonPayload',
    fields: {
      person: {
        type: Person.type
      },
      clientMutationId: {
        type: GraphQLString
      }
    }
  }
);

export const AddLikeToPerson = {
  type: AddLikeToPersonPayload,
  description: 'Updates the count',
  args: {
    input: {
      type: AddLikeToPersonInput
    }
  },
  resolve: (parent, { input }) => addLike(input)
};

import { getPrincipal } from '../../repositories/persons';

import {
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import { PrincipalType } from '../types/principal';

export const Principal = {
  type: PrincipalType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (parent, { id }) => getPrincipal(id),
  description: 'Retrieve a principal'
};

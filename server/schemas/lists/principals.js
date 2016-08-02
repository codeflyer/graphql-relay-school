import { getPrincipals } from '../../repositories/persons';

import {
  GraphQLInt,
  GraphQLList
} from 'graphql';

import { PrincipalType } from '../types/principal';

export const PrincipalsList = {
  type: new GraphQLList(PrincipalType),
  args: {
    count: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  },
  resolve(parent, { offset = 0, count = 10 }) {
    return getPrincipals(offset, count);
  },
  description: 'Retrieve the list of the principals'
};

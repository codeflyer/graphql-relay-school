import { getPeople } from '../../repositories/persons';

import {
  GraphQLInt,
  GraphQLList
} from 'graphql';

import { PersonType } from '../types/person';

export const PeopleList = {
  type: new GraphQLList(PersonType),
  args: {
    count: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  },
  resolve(parent, { offset = 0, count = 10 }) {
    return getPeople(offset, count);
  },
  description: 'Retrieve the people list'
};

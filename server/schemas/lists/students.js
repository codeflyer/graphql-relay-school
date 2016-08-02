import { getStudents } from '../../repositories/persons';

import {
  GraphQLInt,
  GraphQLList
} from 'graphql';

import { StudentType } from '../types/student';

export const StudentsList = {
  type: new GraphQLList(StudentType),
  args: {
    count: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  },
  resolve(parent, { offset = 0, count = 10 }) {
    return getStudents(offset, count);
  },
  description: 'Time to get the users'
};

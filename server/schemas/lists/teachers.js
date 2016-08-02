import { getTeachers } from '../../repositories/persons';

import {
  GraphQLInt,
  GraphQLList
} from 'graphql';

import { TeacherType } from '../types/teacher';

export const TeachersList = {
  type: new GraphQLList(TeacherType),
  args: {
    count: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    }
  },
  resolve(parent, { offset = 0, count = 10 }) {
    return getTeachers(offset, count);
  },
  description: 'Retrieve the list of the principals'
};

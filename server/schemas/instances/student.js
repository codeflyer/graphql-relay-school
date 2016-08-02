import { getStudent } from '../../repositories/persons';

import {
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import { StudentType } from '../types/student';

export const Student = {
  type: StudentType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (parent, { id }) => getStudent(id),
  description: 'Get the student'
};

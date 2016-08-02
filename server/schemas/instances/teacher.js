import { getTeacher } from '../../repositories/persons';

import {
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import { TeacherType } from '../types/teacher';

export const Teacher = {
  type: TeacherType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (parent, { id }) => getTeacher(id),
  description: 'Retrieve the teacher'
};

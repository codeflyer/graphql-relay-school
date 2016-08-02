import {
  GraphQLObjectType
} from 'graphql';

import { PersonType, PersonTypeFieldsList } from './person';

export const TeacherType = new GraphQLObjectType({
  name: 'teacher',
  interfaces: [PersonType],
  isTypeOf: (obj) => obj.role.indexOf('teacher') > -1,
  fields: () => (Object.assign(
    {},
    PersonTypeFieldsList,
    {}
  ))
});

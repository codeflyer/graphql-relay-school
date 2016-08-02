import {
  GraphQLObjectType
} from 'graphql';

import { PersonType, PersonTypeFieldsList } from './person';

export const StudentType = new GraphQLObjectType({
  name: 'student',
  interfaces: [PersonType],
  isTypeOf: (obj) => obj.role.indexOf('student') > -1,
  fields: () => (Object.assign(
    {},
    PersonTypeFieldsList,
    {}
  ))
});

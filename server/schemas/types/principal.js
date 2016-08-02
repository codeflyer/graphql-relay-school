import {
  GraphQLObjectType
} from 'graphql';

import { PersonType, PersonTypeFieldsList } from './person';

export const PrincipalType = new GraphQLObjectType({
  name: 'principal',
  interfaces: [PersonType],
  isTypeOf: (obj) => obj.role.indexOf('principal') > -1,
  fields: () => (Object.assign(
    {},
    PersonTypeFieldsList,
    {}
  ))
});

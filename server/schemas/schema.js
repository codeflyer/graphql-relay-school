import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import { Person } from './instances/person';
import { PeopleList } from './lists/people';
import { Student } from './instances/student';
import { StudentsList } from './lists/students';
import { Principal } from './instances/principal';
import { PrincipalsList } from './lists/principals';
import { Teacher } from './instances/teacher';
import { TeachersList } from './lists/teachers';
import { AddLikeToPerson } from './mutations/addLikeToPerson';

const queryDefinitions = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello World!!',
      description: 'This is the hello world'
    },
    person: Person,
    people: PeopleList,
    student: Student,
    students: StudentsList,
    principal: Principal,
    principals: PrincipalsList,
    teacher: Teacher,
    teachers: TeachersList,
    viewer: {
      type: new GraphQLObjectType({
        name: 'viewer',
        fields: () => ({
          people: PeopleList,
          students: StudentsList,
          principals: PrincipalsList,
          teachers: TeachersList
        })
      }),
      resolve: () => ''

    }
  }
});

const mutationDefinitions = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addLikeToPerson: AddLikeToPerson
  }
});

export const schema = new GraphQLSchema({
  query: queryDefinitions,
  mutation: mutationDefinitions
});

export default schema;

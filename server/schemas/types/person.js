import {
  GraphQLInterfaceType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import { NameType } from './name';
import { LocationType } from './location';
import { PictureType } from './picture';

export const PersonTypeFieldsList = {
  id: {
    type: GraphQLID
  },
  name: {
    type: NameType
  },
  location: {
    type: LocationType
  },
  email: {
    type: GraphQLString
  },
  phone: {
    type: GraphQLString
  },
  cell: {
    type: GraphQLString
  },
  picture: {
    type: PictureType
  },
  role: { type: new GraphQLList(GraphQLString) },
  like: {
    type: GraphQLInt
  }
};

export const PersonType = new GraphQLInterfaceType({
  name: 'person',
  fields: () => (PersonTypeFieldsList)
});

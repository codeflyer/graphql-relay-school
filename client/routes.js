import React from 'react';
import Relay from 'react-relay';
import { Route } from 'react-router';

import { MainLayout } from './layouts/mainLayout';
import { PeopleTabs } from './layouts/peopleTabs';

import { PeopleList } from './pages/peopleList';
import { StudentsList } from './pages/studentsList';
import { TeachersList } from './pages/teachersList';
import { PrincipalsList } from './pages/principalsList';
import { PersonDetails } from './pages/personDetails';

const PeopleQueries = {
  peopleview: () => Relay.QL`
      query {
        viewer
      }
    `
};

const PersonQueries = {
  person: () => Relay.QL`
      query {
        person(id: $personId)
      }
    `
};

export default (
  <Route
    component={MainLayout}
  >
    <Route
      name="peopleList"
      path="/"
      component={PeopleList}
      queries={PeopleQueries}
      localLayout={PeopleTabs}
      current="all"
    />
    <Route
      name="studentList"
      path="/students"
      component={StudentsList}
      queries={PeopleQueries}
      localLayout={PeopleTabs}
      current="students"
    />
    <Route
      name="teacherList"
      path="/teachers"
      component={TeachersList}
      queries={PeopleQueries}
      localLayout={PeopleTabs}
      current="teachers"
    />
    <Route
      name="principalsList"
      path="/principals"
      component={PrincipalsList}
      queries={PeopleQueries}
      localLayout={PeopleTabs}
      current="principals"
    />
    <Route
      name="person"
      path="/person/:personId"
      component={PersonDetails}
      queries={PersonQueries}
    />
  </Route>
);

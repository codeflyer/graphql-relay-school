import React from 'react';
import { Route } from 'react-router';
import { MainLayout } from './layouts/mainLayout';
import { PeopleList } from './pages/peopleList';

export default (
  <Route>
    <Route component={MainLayout}>
      <Route path="/" component={PeopleList}/>
    </Route>
  </Route>
);

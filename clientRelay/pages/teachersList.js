import React from 'react';
import Relay from 'react-relay';

import { PersonRow } from '../components/personRow';

class TeachersListComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.peopleview.teachers.map(person => <PersonRow key={person.id} person={person} />)}
      </div>
    );
  }
}
export const TeachersList = Relay.createContainer(TeachersListComponent, {
  fragments: {
    peopleview: () => Relay.QL`
      fragment on viewer {
         teachers {
          ${PersonRow.getFragment('person')}
         }
      }
    `
  }
});

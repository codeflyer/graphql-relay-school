import React from 'react';
import Relay from 'react-relay';

import { PersonRow } from '../components/personRow';

class StudentsListComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.peopleview.students.map(person => <PersonRow key={person.od} person={person} />)}
      </div>
    );
  }
}
export const StudentsList = Relay.createContainer(StudentsListComponent, {
  fragments: {
    peopleview: () => Relay.QL`
      fragment on viewer {
         students {
          ${PersonRow.getFragment('person')}
         }
      }
    `
  }
});

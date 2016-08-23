import React from 'react';
import Relay from 'react-relay';

import { PersonRow } from '../components/personRow';

class PeopleListComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.peopleview.people.map(person => <PersonRow key={person.id} person={person} />)}
      </div>
    );
  }
}

export const PeopleList = Relay.createContainer(PeopleListComponent, {
  fragments: {
    peopleview: () => Relay.QL`
      fragment on viewer {
         people {
          ${PersonRow.getFragment('person')}
         }
      }
    `
  }
});

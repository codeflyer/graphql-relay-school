import React from 'react';
import Relay from 'react-relay';

import { PersonRow } from '../components/personRow';

class PrincipalsListComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.peopleview.principals.map(person => <PersonRow key={person.id} person={person} />)}
      </div>
    );
  }
}
export const PrincipalsList = Relay.createContainer(PrincipalsListComponent, {
  fragments: {
    peopleview: () => Relay.QL`
      fragment on viewer {
         principals {
          ${PersonRow.getFragment('person')}
         }
      }
    `
  }
});

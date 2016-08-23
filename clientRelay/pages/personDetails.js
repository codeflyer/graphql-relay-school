import React from 'react';
import Relay from 'react-relay';

import { Person } from '../components/person';

class PersonDetailsComponent extends React.Component {
  render() {
    return (
      <div>
        <Person person={this.props.person} />
      </div>
    );
  }
}
export const PersonDetails = Relay.createContainer(PersonDetailsComponent, {
  fragments: {
    person: () => Relay.QL`
      fragment on person {
          ${Person.getFragment('person')}
      }
    `
  }
});

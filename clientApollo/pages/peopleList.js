import React from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import { personRowFragment } from '../components/personRow';
// import Relay from 'react-relay';

import { PersonRow } from '../components/personRow';

export class PeopleListComponent extends React.Component {
  render() {
    if (this.props.peopleview.viewer) {
      return (
        <div>
          {this.props.peopleview.viewer.people.map(person => <PersonRow key={person.id} person={person} refetch={this.props.peopleview.refetch}/>)}
        </div>
      );
    }
    return <div>loading</div>;
  }
}

// Use the fragment in a query
// Note that we use the fragment name to refer to it, not the variable name from JavaScript.

function mapQueriesToProps({ ownProps, state }) {
  return {
    peopleview: {
      query: gql`
        query {
          viewer { people { ...personrow }}
        }
      `,
      fragments: personRowFragment
    }
  };
}

export const PeopleList = connect({
  mapQueriesToProps
})(PeopleListComponent);

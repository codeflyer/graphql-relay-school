import React from 'react';
// import Relay from 'react-relay';

// import { LikeStoryMutation } from '../mutations/like';

import gql from 'graphql-tag';
import { connect } from 'react-apollo';
import { createFragment } from 'apollo-client';

export class LikeComponent extends React.Component {

  addLike() {
    this.props.mutations
      .addSomeLike(this.props.person.id)
      .then((result) => {
        console.log('result');
        console.log(this.context);
        console.log('refet');
        this.props.refetch()
        // console.log(this.props.person);
        // this.props.person.refetch();
        // console.log('done');
      });
  }

  render() {
    return (
      <div>
        <div>Likes: {this.props.person.like}</div>
        <button className="btn" onClick={this.addLike.bind(this)}>+</button>
      </div>
    );
  }

}

function mapMutationsToProps({ ownProps, state }) {
  return {
    addSomeLike: (personId) => ({
      mutation: gql`
      mutation addSomeLike($personId: ID!) 
        {
          addLike(personId: $personId)
          {person {id, like}}
        }
      `,
      variables: {
        // Use the container component's props
        personId: personId
      },
      updateQueries: {
        viewer: (previousQueryResult, { mutationResult }) => {
          console.log('previousQueryResult');
          console.log(previousQueryResult);
          console.log(mutationResult);
          // return {
          //
          //   title: previousQueryResult.title,
          //   tasks: [...previousQueryResult.tasks, mutationResult],
          // };
        },
      },
    })
  };
}

function mapQueriesToProps({ ownProps, state }) {
  return {
    peopleview: {
      query: gql`
        query {
          person(id: $id) { like }
        }
      `,
      variables: {
        id: ownProps.person.id
      }
    }
  };
}

export const personLikeFragment = createFragment(gql`
  fragment personLike on person {
        id, 
        like
      }
`);

export const Like = connect({
  // mapQueriesToProps,
  mapMutationsToProps
})(LikeComponent);

import Relay from 'react-relay';

export class LikeStoryMutation extends Relay.Mutation {
  // This method should return a GraphQL operation that represents
  // the mutation to be performed. This presumes that the server
  // implements a mutation type named ‘likeStory’.
  getMutation() {
    return Relay.QL`mutation {addLikeToPerson {person {like}}}`;
  }

  // Use this method to prepare the variables that will be used as
  // input to the mutation. Our ‘likeStory’ mutation takes exactly
  // one variable as input – the ID of the story to like.
  getVariables() {
    return { personId: this.props.person.id };
  }

  // Use this method to design a ‘fat query’ – one that represents every
  // field in your data model that could change as a result of this mutation.
  // Liking a story could affect the likers count, the sentence that
  // summarizes who has liked a story, and the fact that the viewer likes the
  // story or not. Relay will intersect this query with a ‘tracked query’
  // that represents the data that your application actually uses, and
  // instruct the server to include only those fields in its response.
  getFatQuery() {
    return Relay.QL`
      fragment on AddLikeToPersonPayload {
        person { like }
      }
    `;
  }

  // These configurations advise Relay on how to handle the LikeStoryPayload
  // returned by the server. Here, we tell Relay to use the payload to
  // change the fields of a record it already has in the store. The
  // key-value pairs of ‘fieldIDs’ associate field names in the payload
  // with the ID of the record that we want updated.

  // Su questo punto ho perso una mezza giornata
  // A "person" associavo this.props.person, invece a person bisogna associare l'identificativo
  //
  // Vedere:
  // http://blog.pathgather.com/blog/a-beginners-guide-to-relay-mutations#4
  // Define Configs using FIELDS_CHANGE - i.e.
  // "How should Relay intersect the fat query against your local graph to construct the mutation query?"
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        person: this.props.person.id
      }
    }];
  }
}

// This mutation has a hard dependency on the story's ID. We specify this
// dependency declaratively here as a GraphQL query fragment. Relay will
// use this fragment to aensure that the story's ID is available wherever
// this mutation is used.
LikeStoryMutation.fragments = {
  person: () => Relay.QL`
      fragment on person {
        id,
        like
      }
    `
};

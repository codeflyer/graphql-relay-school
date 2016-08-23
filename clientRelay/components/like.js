import React from 'react';
import Relay from 'react-relay';

import { LikeStoryMutation } from '../mutations/like';

class LikeComponent extends React.Component {

  addLike() {
    this.props.relay.commitUpdate(
      new LikeStoryMutation({ person: this.props.person })
    );
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

export const Like = Relay.createContainer(LikeComponent, {
  fragments: {
    person: () => Relay.QL`
      fragment on person {
        id, 
        like
      }
    `
  }
});

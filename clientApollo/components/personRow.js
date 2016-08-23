import React from 'react';
// import Relay from 'react-relay';

import { Panel, Media } from 'react-bootstrap';
import { Link } from 'react-router';

import gql from 'graphql-tag';
import { connect } from 'react-apollo';
import { createFragment } from 'apollo-client';

import { Like, personLikeFragment } from './like';
// import { LikeStoryMutation } from '../mutations/like';

export class PersonRow extends React.Component {
  render() {
    const roleStyles = { border: '1px solid grey', padding: '3px', backgroundColor: '#f0f0f0', marginRight: '3px' };

    console.log(this.props);
    return (
      <div>
        <Panel>
          <Media>
            <Media.Left align="top">
              <Link to={`/person/${this.props.person.id}`}>
                <img width={64} height={64} src={this.props.person.picture.thumbnail} alt="Person Thumbnail"/>
              </Link>
            </Media.Left>
            <Media.Body>
              <Media.Heading>{`${this.props.person.name.first} ${this.props.person.name.last}`}</Media.Heading>
              <p>{this.props.person.email} - {this.props.person.cell}</p>
              <p><b>Roles:</b>
                {this.props.person.role.map(role => <span key={role} style={roleStyles}>{role}</span>)}</p>
                <Like person={this.props.person} refetch={this.props.refetch}/>
            </Media.Body>
          </Media>
        </Panel>
      </div>
    );
  }
}
// Save the fragment into a variable

export const personRowFragment = createFragment(
  gql`fragment personrow on person {
        id,
        name {
          first, last
        },
        email,
        cell,
        picture { thumbnail },
        role,
        ...personLike
      }`,
      [personLikeFragment]
);

// export const PersonRow = Relay.createContainer(PersonRowComponent, {
//   fragments: {
//     person: () => Relay.QL`
//       fragment on person {
//         id,
//         name {
//           first, last
//         },
//         email,
//         cell,
//         picture { thumbnail },
//         role,
//         ${Like.getFragment('person')},
//         ${LikeStoryMutation.getFragment('person')}
//       }
//     `
//   }
// });

import React from 'react';
import Relay from 'react-relay';

import { Panel, Media } from 'react-bootstrap';
import { Link } from 'react-router';

class PersonComponent extends React.Component {
  render() {
    const roleStyles = { border: '1px solid grey', padding: '3px', backgroundColor: '#f0f0f0', marginRight: '3px' };

    return (
      <div>
        <Panel>
          <Media>
            <Media.Left align="top">
              <Link to={`/person/${this.props.person.id}`}>
                <img width={128} height={128} src={this.props.person.picture.large} alt="person thumbnail" />
              </Link>
            </Media.Left>
            <Media.Body>
              <Media.Heading>{`${this.props.person.name.first} ${this.props.person.name.last}`}</Media.Heading>
              <p>{this.props.person.email} - {this.props.person.cell}</p>
              <p>
                {this.props.person.location.street}, {this.props.person.location.city},
                {this.props.person.location.state}, {this.props.person.location.postcode}</p>
              <p><b>Roles:</b>
                {this.props.person.role.map(role => <span key={role} style={roleStyles}>{role}</span>)}</p>
            </Media.Body>
          </Media>
        </Panel>
      </div>
    );
  }

}

export const Person = Relay.createContainer(PersonComponent, {
  fragments: {
    person: () => Relay.QL`
      fragment on person {
        id,
        name {
          first, last
        },
        location {
          street, city, state, postcode
        },
        email,
        cell,
        picture { large },
        role
      }
    `
  }
});

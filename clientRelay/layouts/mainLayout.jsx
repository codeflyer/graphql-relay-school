import React from 'react';

import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

export class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Navbar inverse={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Link</NavItem>
              <NavItem eventKey={2} href="#">Link</NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider={true} />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight={true}>
              <NavItem eventKey={1} href="#">Link Right</NavItem>
              <NavItem eventKey={2} href="#">Link Right</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <div className="starter-template">
            <h1>People List</h1>
            <p className="lead">
              The list of people in the school.<br/>
            </p>
              {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

export class PeopleTabs extends React.Component {
  handleSelect(key) {
    switch (key) {
      case 'all':
        this.props.history.push('/');
        return;
      default:
        this.props.history.push(`/${key}`);
    }
  }

  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey={this.props.current || 'all'}
          id="uncontrolled-tab-example"
          onSelect={this.handleSelect.bind(this)}
        >
          <Tab eventKey={'all'} title="All"/>
          <Tab eventKey={'students'} title="Students"/>
          <Tab eventKey={'teachers'} title="Teachers"/>
          <Tab eventKey={'principals'} title="Principals"/>
        </Tabs>
        <div style={{ marginTop: '10px' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

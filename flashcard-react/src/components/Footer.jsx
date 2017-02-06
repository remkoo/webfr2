import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Footer extends React.Component {
  render() {
    return <Row>
        <Col xs={4}>&copy; {this.props.leftMessage}</Col>
        <Col xs={4} xsOffset={4} className="text-right">{this.props.rightMessage}</Col>
      </Row>
  }
}

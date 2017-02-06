import React from 'react';
import {render} from 'react-dom';
import { Glyphicon, Jumbotron, Button } from 'react-bootstrap';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
    this.increment = this.increment.bind(this);
    this.reset = this.reset.bind(this);
  }
  increment() {
    this.setState({ counter: this.state.counter + 1 });
  }
  reset() {
    this.setState({ counter: 0 });
  }
  render () {
    const nrStyle = {
      textAlign: 'center',
      fontSize: '440px'
    };
    return (
      <div className="container-fluid">
          <p style={nrStyle}>{this.state.counter}</p>
          <Button bsStyle="primary" onClick={this.increment}>
            <Glyphicon glyph="plus" />
          </Button>&nbsp;
          <Button bsStyle="primary" onClick={this.reset}>
            <Glyphicon glyph="refresh" />
          </Button>&nbsp;
          {this.props.message}
      </div>
    )
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.timer = setInterval(this.increment, 1);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.timer);
  }
  
}

render(
    <Counter message="Dröck die Chnöpf zom ue zelle und zruggstelle."/>,
    document.getElementById('app')
);

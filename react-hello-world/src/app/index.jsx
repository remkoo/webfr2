import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.names = ['Paul', 'John', 'Ringo', 'George']; 
    this.state = { index: 0 };
    this.tick = this.tick.bind(this);
    setInterval(this.tick, 1000);
  }

  tick() {
    this.setState({index: (this.state.index + 1) % this.names.length });
  }

  render () {
    return (
      <h1>
        {this.props.message} {this.names[this.state.index]}
      </h1>
    );
  }
}

render(
  <App message= 'Say hello to'/>, 
  document.getElementById('app')
);

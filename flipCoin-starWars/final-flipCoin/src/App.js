import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
      </div>
    );
  }
}


class FlipCoin extends Component {
  constructor(props) {
    super();
    this.state = {coin: null};
  }

  flip = () => {
    this.setState({
      coin: Math.round(Math.random()) ? 'heads' : 'tails'
    })
  }

  render() {
    let { coin } = this.state;
    return (
      <>
        <p> { coin ? coin : 'Flip the Coin'}</p>
        <button onClick={this.flip}>
          Flip
        </button>
      </>
    );
  }
}

export default FlipCoin;

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
 

class Flipcoin extends Component {
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
            <Button  variant="primary" onClick={this.flip}>
             Flip
            </Button>
      </>

    );
  }
}


export default Flipcoin;
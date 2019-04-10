import React, { Component } from 'react';
import './App.css';

class GetPlanet extends Component {
  constructor(props){
    super();
    this.state = {planet: null};
  }

  randomPlanet = () => {
    let randomNumber = (Math.floor(Math.random() * 61) + 1);
    fetch(`https://swapi.co/api/planets/${randomNumber}`).then((res) => {
        return res.json();
      }).then((json) => {
        this.setState({
         planet: json.name
        });
      })
  }

  render() {
    let { planet } = this.state;
    return (
      <>
        <p> {planet ? planet : 'Get a planet from the Star Wars Series'} </p>
        <button onClick={this.randomPlanet}>
          Random planet
        </button>
      </>
    )
  }
}



export default GetPlanet;

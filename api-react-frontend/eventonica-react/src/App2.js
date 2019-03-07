/****************************************************
 GET ONE EVENTS BASED ON ID COMPONENT
 ****************************************************/


import React, { Component } from 'react';
import './App.css';


// component creating a class
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/events/36")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Event with specific ID</h1>
          <ul>
              <li key={items.id}>
                {items.id} - 
                {items.name} 
              </li>
          </ul>
        </div>
      );
    }
  }
}



export default MyComponent;


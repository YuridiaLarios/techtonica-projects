import React, { Component } from 'react';
import SingleSideAddEvent from './SingleSideAddEvent';
import Error from './Error';

class SideAddEvents extends Component {
  handleSearch = (eventName) =>{
    const body = {
      'name': eventName //body
    };

    const url = `http://localhost:3000/events`;

    fetch(url, { //endpoint
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((event) => {
        // addEvent property passed by parent component, then we call the addEvent function 
        this.props.addEvent(event)
      })
      .catch((error) => {
        this.setState({
          error: true
        })
      });
  };



  constructor(props) {
    super(props);
    this.state = {
      events: {},
      error: false,
    };
  }

  renderItems() {
    if (!this.state.error) {
      return (
         <SingleSideAddEvent key={this.state.events.id} item={this.state.events} />
      );
    } else {
      return <Error />
    }
  }

  render() {
    return (
      <div className="row">
        {this.renderItems()}
          <div className="app-container">
            <SearchBar handleSubmit={this.handleSearch} />
          </div>
      </div>
    );
  }
}


class SearchBar extends React.Component {
    
  handleSubmit = (event) => {
    event.preventDefault();
    const eventName = event.target.eventName.value;
    this.props.handleSubmit(eventName);
  };

  render() {
    return (
      <div className="textFieldSearchDiv">
        <form onSubmit={this.handleSubmit}>
          <input
            name="eventName"
            className="form-control textFieldSearch"
            type="text"
            placeholder="Type Name press ENTER"
          />
        </form>
      </div>
    );
  }
}

export default SideAddEvents;

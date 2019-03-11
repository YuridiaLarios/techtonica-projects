import React, { Component } from 'react';
import DeleteButton from './DeleteButton';
import Error from './Error';

class SideDeleteEvents extends Component {
  
  handleSearch = (eventId) =>{
    const url = "http://localhost:3000/events/" + eventId;

    fetch(url, { //endpoint
        method: 'delete'
      })
      .then((response) => {
        return response.json();
      })
      .then((deletedEvent) => {
        // deleteEvent property passed by parent component, then we call the deleteEvent function 
        this.props.deleteEvent(deletedEvent)
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
         <DeleteButton key={this.state.events.id} item={this.state.events} handleSubmit={this.handleSearch}/>
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
    const eventID = event.target.eventID.value;
    this.props.handleSubmit(eventID);
  };

  render() {
    return (
      <div className="textFieldSearchDiv">
        <form onSubmit={this.handleSubmit}>
          <input
            name="eventID"
            className="form-control textFieldSearch"
            type="text"
            placeholder="Type ID and press ENTER"
          />
        </form>
      </div>
    );
  }
}

export default SideDeleteEvents;

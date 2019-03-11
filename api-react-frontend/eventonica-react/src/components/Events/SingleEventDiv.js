import React, { Component } from 'react';
import DeleteButton from './DeleteButton';
import Error from './Error';

class SingleEventDiv extends Component {
  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      events: {},
      error: false
    };
  }

  // to handle deleting an event from database
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


  render(){
    return (
      <div className="col s4">
      <div className="card cardStyle">
        <div className="card-content">
          <p><span className="bold-pink">Id#</span> {this.props.item.id}</p>
          <p><span className="bold-pink">Name:</span> {this.props.item.name}</p> 
        </div>
        <DeleteButton key={this.props.item.id} item={this.props.item}  handleSubmit={this.handleSearch} />
      </div>
    </div>
    );
  }
}

export default SingleEventDiv;
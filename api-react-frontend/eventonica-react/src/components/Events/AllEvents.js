
/****************************************************
 GET ALL EVENTS COMPONENT
 ****************************************************/


import React, { Component } from 'react';
import NewSingle from './SingleAllEvents';
import Error from './Error';

class AllEvents extends Component {
  constructor(props) {
    super(props); // props ia an object that has events in it now
    this.state = {
      error: false
    };
  }


  renderItems() {
    if (!this.state.error) {
      // Allevents come from its parent
      return this.props.events.map((item) => (
        <NewSingle key={item.id} item={item} />
      ));
    } else {
      return <Error />
    }
  }

  render() {
    return (
      <div className="row">
        <h1>All Events</h1>
        {this.renderItems()}
      </div>
    );
  }
}

export default AllEvents;

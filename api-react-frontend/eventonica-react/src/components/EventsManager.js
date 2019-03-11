import React, { Component } from 'react';
import './App.css';
import AllEvents from './Events/AllEvents';
import SideEventById from './Events/SideEventById';
import SideAddEvent from './Events/SideAddEvent';
import SideUpdateEvents from './Events/SideUpdateEvent';
import SideDeleteEvents from './Events/SideDeleteEvent';



/*************************************************
 MAIN PARENT COMPONENT
**************************************************/
class EventsManager extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {events: []}
  }



  // binds this method to app instance
  addEvent = (newEvent) => {
    // CREATING A NEW INSTANCE SO REACT CAN COMPARE OLD STATES TO NEW STATES
    let updatedEvents = Array.from(this.state.events);
    updatedEvents.push(newEvent);
    this.setState({ // takes an object and merges that object into the current state
      events: updatedEvents
    })
  }

   // binds this method to app instance
   deleteEvent = (deletedEvent) => {
    // CREATING A NEW INSTANCE SO REACT CAN COMPARE OLD STATES TO NEW STATES
    let updatedEvents = Array.from(this.state.events);
    let oldEvent = this.state.events.findIndex(function (element) {
      return deletedEvent.id === element.id;
    });
    // console.log(oldEvent);
    // updatedEvents.push(event);
    updatedEvents.splice(oldEvent, 1);
    this.setState({ // takes an object and merges that object into the current state
      events: updatedEvents
    })
  }



  //moving it here makes it accessible
  componentDidMount() {
    const url = `http://localhost:3000/events`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          events: data
        })
      })
      .catch((error) => {
        this.setState({
          error: true
        })
      });
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper pink darken-1">
              <a href="/" className="brand-logo logo">Eventonica</a>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="col s8">
          {/* giving things to child components (think of it as parameters been passed to a function) */}
            <AllEvents events={this.state.events}/> 
          </div>
          <div className="col s4">
            <SideEventById />
            {/* parent to child we give them props, in order to give things back, we give the child a function that they can call with whatever data they want to give back to the parent  */}
            <SideAddEvent addEvent={this.addEvent} />
            <SideUpdateEvents />
            <SideDeleteEvents deleteEvent={this.deleteEvent}/>
          </div>
        </div>
      </div>
    );
  }
}

export default EventsManager;

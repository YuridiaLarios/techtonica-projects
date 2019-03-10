import React, { Component } from 'react';
import './App.css';
import AllEvents from './Events/AllEvents';
import SideEventById from './Events/SideEventById';
import SideAddEvent from './Events/SideAddEvent';
import SideUpdateEvents from './Events/SideUpdateEvent';
import SideDeleteEvents from './Events/SideDeleteEvent';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {events: []}
  }

  // binds this method to app instance
  addEvent = (event) => {
    // this.state.events.push(event); // mutating the state and react doesnt know we are changing state
    let updatedEvents = Array.from(this.state.events);
    updatedEvents.push(event);
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
            {/* parent to child we gae them props, in order to give things back, we give the child a function that they can call with whatever data they want to give back to the parent  */}
            <SideAddEvent addEvent={this.addEvent} />
            <SideUpdateEvents />
            <SideDeleteEvents />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
  
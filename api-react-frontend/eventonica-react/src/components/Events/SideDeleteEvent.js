import React, { Component } from 'react';
import SingleSideDeleteEvent from './SingleSideDeleteEvent';
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
  };



  constructor(props) {
    super(props);
    this.state = {
      events: {},
      error: false,
    };

  }

  componentDidMount() {
  }

  renderItems() {
    if (!this.state.error) {
      return (
         <SingleSideDeleteEvent key={this.state.events.id} item={this.state.events} />
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
            <RepoList repos={this.state.repos}/>
          </div>
      </div>
    );
  }
}


class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
    
  handleSubmit = (event) => {
    event.preventDefault();
    const text = event.target.eventID.value;
    this.props.handleSubmit(text);
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




class RepoList extends React.Component {

  render(){
    var rows = [];
      this.props.repos.map((repo,index) => rows.push(<RepoItem key={index} repo={repo} />))
    return (
      <div className="list-group">
        {rows}
      </div>
    )
  }
}
RepoList.defaultProps = {
  repos: []
};

class RepoItem extends React.Component {
  render(){
    return (
        <a href="null" className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{this.props.repo.name}</h5>
      <small>{new Date(Date.parse(this.props.repo.created_at)).toLocaleDateString()}</small>
    </div>
    <p className="mb-1">{this.props.repo.description}</p>
    <small>{this.props.repo.html_url}</small>
  </a>
    )
  }
}

export default SideDeleteEvents;

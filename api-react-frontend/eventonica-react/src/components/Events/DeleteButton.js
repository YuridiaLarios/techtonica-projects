import React, { Component } from 'react';


class DeleteButton extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const eventID = 128;
    this.props.handleSubmit(eventID);
  };

  render() {
    return (
      <div>
        <div>
          <button className="btn-floating btn-small waves-effect waves-light red" onClick={this.handleSubmit}>
          <i className="material-icons">delete_forever</i>
          </button>
        </div>
      </div>
    );
  }
}
  


export default DeleteButton;
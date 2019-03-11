import React, { Component } from 'react';


class UpdateButton extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const eventID = this.props.item.id;
    this.props.handleSubmit(eventID);
  };

  render() {
    return (
      <div>
        <div className="updateButtonDiv">
          <button className="updateButton btn-floating btn-small waves-effect waves-light blue" onClick={this.handleSubmit}>
          <i className="material-icons">update</i>
          </button>
        </div>
      </div>
    );
  }
}
  


export default UpdateButton;
import React, { Component } from 'react';


// Create component for button
class Button extends Component {
  render() {
    return (
      <fieldset>
        <button
          type={this.props.type || 'button'}
          value={this.props.value || null}
        >
          {this.props.text}
        </button>
      </fieldset>
    );
  }
};


class DeleteButton extends Component {
  render() {
    return (
      <form method='' action=''>
    


        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='New Event Name: '
          required='true'
          type='text'
        />
        
        <Button
          type='submit'
          value='submit'
          text='Delete'
        />
      </form>
    )
  }
}

export default DeleteButton;

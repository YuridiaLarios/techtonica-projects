import React, { Component } from 'react';
import SingleSideAddEvent from './SingleSideUpdateEvent';
// import FormTest from './News/FormSmall';
import Error from './Error';

class SideUpdateEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {},
      error: false,
    };
  }


    // function to put/update the name of the event using fetch
    updateData(id, newName) {
      const body = {
        'name': newName
      };
      fetch('http://localhost:3000/events/' + id, {
        method: 'put',
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => {
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



  componentDidMount() {
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
        <Form/>
      </div>
    );
  }
}


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


// Create component for label
class Label extends Component {
  render() {
    if (this.props.hasLabel === 'true') {
      return <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
    }
  }
}

// Create component for input
class Input extends Component {
  render() {
    return (
      <fieldset>
        <Label
          hasLabel={this.props.hasLabel}
          htmlFor={this.props.htmlFor}
          label={this.props.label}
        />

        <input
          id={this.props.htmlFor}
          max={this.props.max || null}
          min={this.props.min || null}
          name={this.props.name || null}
          placeholder={this.props.placeholder || null}
          required={this.props.required || null}
          step={this.props.step || null}
          type={this.props.type || 'text'}
        />
      </fieldset>
    );
  }
}


// Create component for form
class Form extends Component {
  render() {
    return (
      <form method='' action=''>
    
        <Input
          hasLabel='true'
          htmlFor='numberInput'
          label='Id of Event to be Updated: '
          required='true'
          type='number'
          min='1'
          step='1'
        />

        <Input
          hasLabel='true'
          htmlFor='textInput'
          label='New Event Name: '
          required='true'
          type='text'
        />
        
        <Button
          value='submit'
          text='Update Event'
        />
      </form>
    )
  }
}

export default SideUpdateEvents;

/****************************************************
 POST NEW EVENT COMPONENT
 ****************************************************/



import React, { Component } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';




// component creating a class
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }

  componentDidMount() {
    this.setState({
      isLoaded: true,
      items: { "name": "*", "id": "*"}
    });
  }



  

  clickMe(param1) {
    // fetch("http://localhost:3000/events/57")
    // .then(res => res.json())
    // .then(
    //   (result) => {
    //     console.log(result)
    //     this.setState({
    //       isLoaded: true,
    //       items: result
    //     });
    //   },
    //   // Note: it's important to handle errors here
    //   // instead of a catch() block so that we don't swallow
    //   // exceptions from actual bugs in components.
    //   (error) => {
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     });
    //   }
    // )

    const body = {
      'name': "React Event"//body
    };

    fetch('http://localhost:3000/events', { //endpoint
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )


}

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Event Name: </Form.Label>
                  <Form.Control  placeholder="ex: Cocktails Night" />
                  <Form.Text className="text-muted">
                    Better be an exciting one!
                  </Form.Text>
                </Form.Group>

                <Button onClick={this.clickMe.bind(this,items)} variant="dark" size="lg">Post New Event</Button>
              </Form>
              

          <ul>
              <li key={items.id}>
                {items.id} - 
                {items.name} 
              </li>
          </ul>
        </div>
      );
    }
  }
}




export default MyComponent;


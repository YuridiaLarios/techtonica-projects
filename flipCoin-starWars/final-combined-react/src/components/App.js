import React, { Component } from 'react';
import { Container, Col, Nav, Navbar, Row } from 'react-bootstrap';
import './App.css';
import Flipcoin from './Helper-components/Flipcoin';
import Starwars from './Helper-components/Starwars';



class FlipCoin extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      
      <Container>
        <Navbar fixed="top" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Final Assessment</Navbar.Brand>
          <Nav className="mr-auto">
          </Nav>
          <Nav className="in-line">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>

        <Row className="content-margin">
        
          <Col className="text-center content-margin">
            <Flipcoin></Flipcoin>
          </Col>

          <Col xs={6} className="text-center content-margin"> 
            <Starwars></Starwars>
          </Col>
          
          <Col className="text-center content-margin">
            <Flipcoin></Flipcoin>
          </Col>

        </Row>
      </Container>
    );
  }
}

export default FlipCoin;

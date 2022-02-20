import "./App.css";
import axios from "axios";
import React from "react";
import Score from "./component/Score"
import SlotMachine from "./component/SlotMachine"
import Bet from "./component/Bet"
import HighScore from "./component/HighScore"
import Credits from "./component/Credits"

import QuestionBox from "./component/QuestionBox"

import { Container, Row, Col, Button } from "react-bootstrap";

class App extends React.Component {
  getData = async () => { // removed const, return type
    const response = await axios("http://localhost:8000/myrocket");
    console.log(response.data);
  };
  /*
  useEffect(() => {
    getData();
  }, []);
  */
  render() {
    return (
      <Container className="App border border-dark mt-4 m-auto" >
        <Container className="bg-white p-2" >
          <Row className="p-2">
            <Col className="float-start border mb-2" sm={2}>
              <Button variant="outline-primary" size="lg">Login </Button>
            </Col>
            <Col className="float-end ms-auto" sm={4}>
              <Score ></Score>
            </Col>
          </Row >
          <Row className="p-2">
            <Col className="border border-primary col-md-5">
              <SlotMachine></SlotMachine>
            </Col>
            <Col className="col-sm-3 mt-5">
              <Bet></Bet>
            </Col>
            <Col>
              <HighScore></HighScore>
            </Col>
          </Row>
          <Row className="p-2">
            <Col className="col-md-5">
              <QuestionBox></QuestionBox>
            </Col>
            <Col className="col-md-4 ms-auto">
              <Credits></Credits>
            </Col>
          </Row>
        </Container>
      </Container >
    )
  }
}

export default App;

import "./App.css";
//import axios from "axios";
import React, { useState } from "react";
import Score from "./component/Score"
import SlotMachine from "./component/SlotMachine"
import Bet from "./component/Bet"
import HighScore from "./component/HighScore"
import Credits from "./component/Credits"
import QuestionBox from "./component/QuestionBox"
import Register from "./component/Register"

import { Container, Row, Col } from "react-bootstrap";

export default function App() {
  //const [score, setScore] = useState(0);
  const [reset, setReset] = useState(false);
  return (
    <Container className=" App gj-main p-3 rounded" >
      <Row lg={4} className="p-2 gj-bg ">
        <Col lg={4} className="float-start border mb-2" >
          <Register> </Register>
        </Col>
        <Col className="float-end ms-auto" sm={4}>
          <Score ></Score>
        </Col>
      </Row >
      <Row className="p-2">
        <Col className=" col-md-5">
          <SlotMachine reset={reset}></SlotMachine>
        </Col>
        <Col className="col-sm-3 mt-5">
          <Bet ></Bet>
        </Col>
        <Col>
          <HighScore></HighScore>
        </Col>
      </Row>
      <Row className="p-2">
        <Col className="col-md-5">
          <QuestionBox setReset={setReset}></QuestionBox>
        </Col>
        <Col className="col-md-4 ms-auto">
          <Credits></Credits>
        </Col>
      </Row>
    </Container>
  );
}
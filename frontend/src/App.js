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
  const [result, setResult] = useState(["", "", ""]);
  const [question, setQuestion] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [disableSlot, setDisableSlot] = useState(false);
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
      <Row className="w-auto ">
        <Col className="col-md-5 px-5">
          <Row className="pt-2 w-auto">
            <SlotMachine reset={reset} result={result} setResult={setResult} setQuestion={setQuestion} setButtonStatus={setButtonStatus} disableSlot={disableSlot} setDisableSlot={setDisableSlot}></SlotMachine>
          </Row>
          <Row className="h-50 py-2 w-auto">
            <QuestionBox setReset={setReset} setResult={setResult} question={question} setQuestion={setQuestion} setButtonStatus={setButtonStatus} buttonStatus={buttonStatus} setDisableSlot={setDisableSlot}></QuestionBox>
          </Row>
        </Col>
        <Col className="col-sm-3 mt-5">
          <Bet ></Bet>
        </Col>
        <Col >
          <Row>
            <HighScore></HighScore>
          </Row>
          <Row className="h-40 py-2">
            <Credits></Credits>
          </Row>
        </Col>
      </Row >
    </Container >
  );
}
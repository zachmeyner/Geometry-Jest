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
import Timer from "./component/Timer"
import { Container, Row, Col } from "react-bootstrap";

export default function App() {
  const [score, setScore] = useState(50);
  const [bet, setBet] = useState(0);
  const [reset, setReset] = useState(false);
  const [result, setResult] = useState(["", "", ""]);
  const [question, setQuestion] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [disableSlot, setDisableSlot] = useState(true);
  const [start, setStart] = useState(false);
  const [expire, setExpire] = useState(false);
  const [disable, setDisable] = useState(false);
  return (
    <Container className=" App gj-main p-3 rounded " >
      <Row className="mx-4 gj-bg w-90">
        <Col lg={4} className="w-40" >
          <Register> </Register>
        </Col>
        <Col lg={5}>
          <p className="text-white title">Geometry Jest </p>
        </Col>
        <Col lg={3} className="" >
          <Score score={score} ></Score>
        </Col>
      </Row >
      <Row className="w-100">
        <Col className="col-md-5 px-5 w-40  ">
          <Row className="pt-2 w-auto">
            <SlotMachine reset={reset} result={result} setResult={setResult} setQuestion={setQuestion} setButtonStatus={setButtonStatus} disableSlot={disableSlot} setDisableSlot={setDisableSlot} setStart={setStart}></SlotMachine>
          </Row>
          <Row className="h-50 pt-2 w-auto">
            <QuestionBox setReset={setReset} setResult={setResult} question={question} setQuestion={setQuestion}
              setButtonStatus={setButtonStatus} buttonStatus={buttonStatus} expire={expire}
              setStart={setStart} score={score} setScore={setScore} bet={bet}
              setBet={setBet} setDisable={setDisable} ></QuestionBox>
          </Row>
        </Col>
        <Col lg={3} className=" p-2 w-25">
          <Row className="w-100 ">
            <Bet score={score} bet={bet} setBet={setBet} setDisableSlot={setDisableSlot} setScore={setScore} disable={disable} setDisable={setDisable} setQuestion={setQuestion}></Bet>
          </Row>
          <Row className="mt-5 ms-4 fs-3 fw-bold ">
            <Timer start={start} setExpire={setExpire} ></Timer>
          </Row>
        </Col>
        <Col>
          <Row className="py-2 w-auto ">
            <HighScore></HighScore>
          </Row>
          <Row className="h-40 pb-3 w-auto">
            <Credits></Credits>
          </Row>
        </Col>
      </Row >
    </Container >
  );
}
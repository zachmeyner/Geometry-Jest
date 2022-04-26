import "./App.css";
//import axios from "axios";
import React, { useState } from "react";
import Score from "./component/Score"
import SlotMachine from "./component/SlotMachine"
import Bet from "./component/Bet"
import HighScore from "./component/HighScore"
import QuestionBox from "./component/QuestionBox"
import Register from "./component/Register"
import Timer from "./component/Timer"
import { Container, Row, Col } from "react-bootstrap";

export default function App() {
  const url = 'http://geometryjest.zacharymeyner.com/';
  const [score, setScore] = useState(10);
  const [bet, setBet] = useState(0);
  const [reset, setReset] = useState(false);
  const [result, setResult] = useState(["", "", ""]);
  const [question, setQuestion] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [disableSlot, setDisableSlot] = useState(true);
  const [start, setStart] = useState(false);
  const [expire, setExpire] = useState(false);
  const [disable, setDisable] = useState(false);
  const [refresh, setRefresh] = useState(true);
  return (
    <Container className=" App gj-main p-2  " >
      <Row className="gj-bg w-100 ms-1">
        <Col lg={4} className="w-40" >
          <Register score={score} setScore={setScore} url={url} expire={expire} setExpire={setExpire} setStart={setStart} setRefresh={setRefresh}>  </Register>
        </Col>
        <Col lg={5}>
          <p className="text-white title">Geometry Jest </p>
        </Col>
        <Col lg={3} className="" >
          <Score score={score} ></Score>
        </Col>
      </Row >
      <Col className="ms-3 w-100 d-flex ">
        <Col lg={5} className="h-100">
          <Row className="w-100 p-1 ">
            <SlotMachine reset={reset} result={result} setResult={setResult} setQuestion={setQuestion} setButtonStatus={setButtonStatus} disableSlot={disableSlot} setDisableSlot={setDisableSlot} setStart={setStart}></SlotMachine>
          </Row>
          <Row className="w-100 p-1 h-50">
            <QuestionBox setReset={setReset} setResult={setResult} question={question} setQuestion={setQuestion}
              setButtonStatus={setButtonStatus} buttonStatus={buttonStatus} expire={expire}
              setStart={setStart} score={score} setScore={setScore} bet={bet}
              setBet={setBet} setDisable={setDisable} ></QuestionBox>
          </Row>
        </Col>
        <Col lg={3} className="h-100 p-1 "  >
          <Row lg={1} className="pe-3 ">
            <Bet score={score} bet={bet} setBet={setBet} setDisableSlot={setDisableSlot} setScore={setScore} disable={disable} setDisable={setDisable} setQuestion={setQuestion} expire={expire}></Bet>
          </Row>
          <Row lg={1} className="ms-4 mt-5 pt-4 ps-3 pt-5">
            <Timer start={start} setExpire={setExpire} ></Timer>
          </Row>
        </Col>
        <Col lg={4} className="pe-3 pt-1">
          <HighScore url={url} refresh={refresh} setRefresh={setRefresh}></HighScore> */
        </Col>
      </Col >
      <div className="gj-credits">
        Daniel Rosales - Frontend | Zachary Meyner - Backend | Jacob Sorensen - Documentation/Testing | Mabel Heggenstaller - Testing | Daniel Heald - Graphics Design
      </div>
    </Container >
  );
}
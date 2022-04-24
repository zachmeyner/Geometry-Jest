import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import click from './../static/clickAnswerChoice.mp3'
import clickSame from './../static/clickSameAnswer.mp3'
export default function QuestionBox({ setReset, setResult, question, setQuestion, buttonStatus, setButtonStatus, setDisableSlot }) {
    const [answer, setAnswer] = useState(-1);
    const [point, setPoint] = useState("gj-oButton");
    const [line, setLine] = useState("gj-oButton");
    const [plane, setPlane] = useState("gj-oButton");
    const clickAudio = new Audio(click);
    const clickSameAudio = new Audio(clickSame);

    function ResetSlot() {
        if (answer === -1) {
            alert("choose")
        } else {
            setResult(["", "", ""])
            setDisableSlot(false);
            setTimeout(() => {
                setReset(true);
            }, 100);
            setReset(false);
            setQuestion([]);
            setButtonStatus(true);
            setPoint("gj-oButton");
            setLine("gj-oButton");
            setPlane("gj-oButton");
            if (Number(question[1]) === Number(answer)) {
                setAnswer(-1);
                alert("correct")
            } else {
                setAnswer(-1);
                alert("wrong")
            }
        }

    }
    function HandleClick(e) {
        if (e.target.value === answer) {
            clickSameAudio.play();
        } else {
            clickAudio.play();
        }
        if (e.target.id === "point") {
            setPoint("gj-oButton-current");
            setLine("gj-oButton");
            setPlane("gj-oButton");
        } else if (e.target.id === "line") {
            setPoint("gj-oButton");
            setLine("gj-oButton-current");
            setPlane("gj-oButton");
        } else {
            setPoint("gj-oButton");
            setLine("gj-oButton");
            setPlane("gj-oButton-current");
        }
        setAnswer(e.target.value);
    }
    return (
        <Container className="h-100 gj-bg text-white">
            <h3 >Question</h3>
            <Row className="w-100 ps-4 h-40">
                <Container className="h-100 p-2 gj-questionbox-bg text-white text-start fs-4">
                    {question[0]}
                </Container>
            </Row>
            <Row className="w-100 pt-4 px-2 float-start">
                <Container className="w-100 ">
                    <button onClick={(e) => { HandleClick(e) }} className={`${point}`} value={1} disabled={buttonStatus} id="point">Point</button> &nbsp;&nbsp;&nbsp;
                    <button onClick={(e) => { HandleClick(e) }} className={`${line}`} value={2} disabled={buttonStatus} id="line">Line</button> &nbsp;&nbsp;&nbsp;
                    <button onClick={(e) => { HandleClick(e) }} className={`${plane}`} value={3} disabled={buttonStatus} plane="pane">Plane</button> &nbsp;&nbsp;&nbsp;
                </Container>
                <Button className="ms-2 mt-2" onClick={ResetSlot} disabled={buttonStatus}> Submit</Button>
            </Row>
        </Container>
    );
}

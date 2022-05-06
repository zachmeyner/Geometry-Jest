import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import click from './../static/clickAnswerChoice.mp3'
import clickSame from './../static/clickSameAnswer.mp3'
import correct from './../static/correct.mp3'
import incorrect from './../static/incorrect.mp3'

export default function QuestionBox({ setReset, setResult, question, setQuestion, buttonStatus, setButtonStatus, expire, setStart, score, setScore, bet, setBet, setDisable }) {
    const [answer, setAnswer] = useState(-1);
    const [point, setPoint] = useState("gj-oButton");
    const [line, setLine] = useState("gj-oButton");
    const [plane, setPlane] = useState("gj-oButton");
    const clickAudio = new Audio(click);
    const clickSameAudio = new Audio(clickSame);
    const correctAudio = new Audio(correct);
    const incorrectAudio = new Audio(incorrect);

    useEffect(() => {
        if (expire) {
            setQuestion([`You scored ${score}. The game has been reset.`]);
            setPoint("gj-oButton");
            setLine("gj-oButton");
            setPlane("gj-oButton");
            setBet(-1);
            setButtonStatus(true);
            setDisable(false);
            setTimeout(() => {
                setReset(true);
            }, 100);
            setReset(false);
        }
    }, [expire, score, setQuestion, setBet, setPoint, setLine, setPlane, setDisable, setReset, setButtonStatus]);

    function ResetSlot() {
        if (answer === -1) {
            console.log("choose");
        } else {
            setResult(["", "", ""]);
            setTimeout(() => {
                setReset(true);
            }, 100);
            setReset(false);
            setDisable(false);
            setStart(false);
            setButtonStatus(true);
            setPoint("gj-oButton");
            setLine("gj-oButton");
            setPlane("gj-oButton");
            if (Number(question[1]) === Number(answer)) {
                setAnswer(-1);
                correctAudio.play();
                setScore(Math.ceil(score + (bet * 0.5)));
                setQuestion(["Correct!"]);
            } else {
                setAnswer(-1);
                setScore(score - bet);
                incorrectAudio.play();
                setQuestion(["Wrong!"]);
            }
            setBet(-1);
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
            <Row lg={10} className="w-100 ps-4">
                <Container className="p-2 gj-questionbox-bg text-white text-start fs-4">
                    {question[0]}
                </Container>
            </Row>
            <Row className="w-100 p-4  px-2 float-start ">
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

import "./Switch.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RollingItem from 'react-rolling-item';
import tileImg from '../static/slot-tile.png';
import crank from './../static/crank.mp3'
import spin from './../static/spin.mp3'
//1 - point , 2 - line, 3 - plane
const questions = new Map([
    [111, ["Three non-collinear points lie on the same _____.", 3]],
    [112, ["Through two points you can draw a unique _____.", 2]],
    [113, ["Two points connected on the same plane form a _____.", 2]],
    [121, ["Collinear points are two points on the same _____.", 2]],
    [122, ["Two non-parallel lines on the same plane intersect at one _____.", 1]],
    [123, ["A line and a point not on the line can be on one _____.", 3]],
    [131, ["Two points connected on the same plane form a _____.", 2]],
    [132, ["A line not parallel to a plane will intersect the plane at one _____.", 1]],
    [133, ["Parallel planes have no lines or _____ in common.", 1]],
    [211, ["A point on a line and two other points not on the line define a _____.", 3]],
    [212, ["Two distinct lines can intersect at one _____.", 1]],
    [213, ["A line and a point not on the line determine a _____.", 3]],
    [221, ["Two parallel lines have no _____ in common.", 1]],
    [222, ["Three parallel lines lie on the same _____.", 3]],
    [223, ["Two parallel lines lie on the same _____.", 3]],
    [231, ["A line and a point not on the line lie on the same _____.", 3]],
    [232, ["Two non-parallel lines on the same plane intersect as a  ____.", 1]],
    [233, ["Two intersecting planes form a  _____.", 2]],
    [311, ["Through two points, many _____ can be drawn.", 3]],
    [312, ["A line and a point not on a line determine a _____.", 3]],
    [313, ["Two planes intersect at more than one _____.", 1]],
    [321, ["A line and a point not on the line determine a _____.", 3]],
    [322, ["Two non-parallel lines on the same plane intersect at one _____.", 1]],
    [323, ["If two planes intersect, they form a _____.", 2]],
    [331, ["Two intersecting planes form many points called a  _____.", 2]],
    [332, ["Two planes intersecting form a _____.", 2]],
    [333, ["Three intersecting planes form at the least a _____.", 1]]
]);
export default function SlotMachine({ reset, result, setResult, setQuestion, setButtonStatus, disableSlot, setDisableSlot, setStart }) {
    const [start, setStartLocal] = useState(false);
    const crankAudio = new Audio(crank);
    const spinAudio = new Audio(spin);
    function DisplayResults(value) {
        var resultNum = Number.parseInt((value.join('')));
        var resultString = ["", "", ""];
        for (var i = 0; i < 3; i++) {
            if (value[i] === 1) {
                resultString[i] = "point";
            } else if (value[i] === 2) {
                resultString[i] = "line";
            } else {
                resultString[i] = "plane";
            }
        }
        setResult([resultString[0], "", ""]);
        setTimeout(() => {
            setResult([resultString[0], resultString[1], ""]);
        }, 250);
        setTimeout(() => {
            setResult([resultString[0], resultString[1], resultString[2]]);
        }, 500);
        setTimeout(() => {
            setQuestion(questions.get(resultNum));
            setStart(true);
        }, 1000);
        setTimeout(() => {
            setButtonStatus(false);
        }, 1000);
    }
    function HandleClick() {
        setStartLocal(true);
        setDisableSlot(true);
        crankAudio.play();
        spinAudio.play();
        setTimeout(() => {
            setStartLocal(false);
        }, 1000);

    }
    return (
        <Container className="h-75 gj-bg">
            <Row lg={6} >
                <Col lg={9} className="ms-2 p-1 position-fixed" >
                    <RollingItem
                        on={start}
                        column={3}
                        backgroundImage={tileImg}
                        backgroundSize="180px 570px"
                        introItemInfo={{ x: -28, y: -200 }}
                        itemInfo={
                            [
                                { x: -28, y: -385, id: 1, probability: 0 }, // point
                                { x: -20, y: -20, id: 2, probability: 0 }, // line
                                { x: -28, y: -200, id: 3, probability: 0 }, //plane

                            ]
                        }
                        width={120}
                        height={183}
                        startDelay={50}
                        completionAnimation={true}
                        rootClassName="tiles"
                        onProgress={(done, value) => { done ? setResult(["", "", ""]) : DisplayResults(value) }}
                        reset={reset}
                    />

                </Col>
                <Col className="pt-2 ">
                    <div className="switch ">
                        <div class={disableSlot ? "srow-disabled" : "srow"}>
                            <label class="vertical-switch">
                                <input disabled={disableSlot} type="checkbox" checked={start} onChange={HandleClick} />
                                <span class="vertical-switch__slider"></span>
                            </label>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="p-1  w-100">
                <Col lg={10}>
                    <Container className="gj-text-bg h-100 text-white text-start fs-3 p-2 text-center ">
                        <p className="d-inline pe-5 me-3 ">{result[0]}</p>
                        <p className="d-inline pe-5 me-3 ">{result[1]}</p>
                        <p className="d-inline pe-5 ">{result[2]}</p>
                    </Container>
                </Col>

            </Row>
        </Container >
    );
}


import "./Switch.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RollingItem from 'react-rolling-item';
import tileImg from '../static/slot-tile.png';
import crank from './../static/crank.mp3'
import spin from './../static/spin.mp3'

export default function SlotMachine({ reset }) {
    const [start, setStart] = useState(false);
    const crankAudio = new Audio(crank);
    const spinAudio = new Audio(spin);

    return (
        <Container className="h-100 w-auto rounded gj-bg position-relative">
            <Row>
                <Col lg={10}>
                    <RollingItem
                        on={start}
                        column={3}
                        backgroundImage={tileImg}
                        backgroundSize="180px 570px"
                        introItemInfo={{ x: -28, y: -200 }}
                        itemInfo={
                            [
                                { x: -20, y: -20, id: 'line', probability: 0 },
                                { x: -28, y: -200, id: 'plane', probability: 0 },
                                { x: -28, y: -385, id: 'point', probability: 0 },
                            ]
                        }
                        width={120}
                        height={183}
                        startDelay={50}
                        completionAnimation={true}
                        rootClassName="tiles"
                        onProgress={(progress, result) => { console.log(result) }}
                        reset={reset}
                    />
                </Col>
                <Col className="pt-2">
                    <div className="switch">
                        <div class="srow">
                            <label class="vertical-switch">
                                <input type="checkbox" checked={start} onChange={() => {
                                    setStart(true);
                                    crankAudio.play();
                                    spinAudio.play();

                                    setTimeout(() => {
                                        setStart(false);
                                    }, 2500);
                                }
                                } />
                                <span class="vertical-switch__slider"></span>
                            </label>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >
    );
}


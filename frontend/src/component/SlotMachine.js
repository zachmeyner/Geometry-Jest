import React, { useState } from "react";
import { Container } from "react-bootstrap";
export default function SlotMachine() {
    const [spin, setSpin] = useState("");
    function HandleSpin() {
        if (spin === "") {
            setSpin("inner-spinner");
        } else {
            setSpin("");
        }
    }
    return (
        <Container className="h-100 w-auto rounded gj-bg position-relative">
            <Container className="w-75 h-75 top-50 position-absolute start-50 translate-middle bg-secondary rounded gj-spinner-container">
                <Container className="h-75 w-25 bg-light top-50 position-absolute start-50 translate-middle gj-spinner">
                    <div className={`fs-3 ${spin}`}>this is a test</div>
                </Container>
                <Container className="h-75 w-25 bg-light top-50 position-absolute start-0 ms-5 translate-middle gj-spinner">
                    <div className={`fs-1 ${spin}`}>_</div>
                </Container>
            </Container>
            <button onClick={HandleSpin}>click</button>
        </Container >
    );
}


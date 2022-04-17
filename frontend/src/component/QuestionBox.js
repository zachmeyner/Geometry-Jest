import React from "react";
import { Button, Container } from "react-bootstrap";
export default function QuestionBox({ setReset }) {
    function ResetSlot() {
        setTimeout(() => {
            setReset(true);
        }, 500);
        setReset(false);
    }
    return (
        <Container className="gj-bg text-white">
            <h2>Question:</h2>
            <Container className=" p-2 border border-warning">
                <p>.</p>
                <p>.</p>
                <p>.</p>

            </Container>
            <Button className="float-end p-2" onClick={ResetSlot}> Submit</Button>
        </Container>
    );
}

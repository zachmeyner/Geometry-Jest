import React from "react";
import { Button, Container } from "react-bootstrap";
class QuestionBox extends React.Component {
    render() {
        return (
            <Container className="border">
                <h2>Question:</h2>
                <Container className=" p-2 border border-warning">
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>

                </Container>
                <Button className="float-end p-2"> Submit</Button>
            </Container>
        )
    }
}

export default QuestionBox;
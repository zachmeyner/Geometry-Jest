import React from "react";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image"
class SlotMachine extends React.Component {
    render() {
        return (
            <Container className="border">
                <Image fluid src={require("../static/slot.jpg")} className="w-50"></Image>
            </Container>
        )
    }
}

export default SlotMachine;
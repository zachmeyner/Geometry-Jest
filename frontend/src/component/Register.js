import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
export default function Register() {
    const [displayForm, setDisplayForm] = useState('d-none');
    const [displayFormBool, setDisplayFormBool] = useState(false);
    const [dataSent, setDataSent] = useState(["", ""]);
    function ShowForm() {
        if (displayForm != 'd-none') {
            setDisplayForm('d-none');
            setDisplayFormBool(false);
        } else {
            setDisplayForm('d-flex');
            setDisplayFormBool(true);
        }
    }
    function HandleRegister(event) {
        setDataSent([event.target[0].value, event.target[1].value]);
        fetch('127.0.0.1:8000/api/v1/handlers/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataSent)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
            })
    }

    return (
        <Container>
            <button className="gj-button translate-middle" onClick={ShowForm}>Submit Score</button>
            <CSSTransition
                in={displayFormBool}
                timeout={200}
                classNames="display"
                unmountOnExit
            >
                <Container className={`bg-light row ${displayForm} position-relative`}>
                    <Form method="POST" action="localhost:8000/api/v1/handlers/login" onSubmit={HandleRegister}>
                        <Row className="p-1" >
                            <Col>
                                <Form.Control autoFocus placeholder="Username" name="user" />

                            </Col>
                            <Col>
                                <Form.Control placeholder="Password" name="pass" />
                            </Col>
                            <Col sm={1}>
                                <button type="button" className="btn-close" aria-label="Close" onClick={ShowForm}></button>
                            </Col>
                        </Row>
                        <Row className="p-1">
                            <Col className="float-start m-0">
                                <Button variant="warning" type="submit">
                                    Register
                                </Button>
                            </Col>
                            <Col className="float-end m-0">
                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </CSSTransition >
        </Container >
    );
}
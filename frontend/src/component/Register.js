import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
export default function Register() {
    const [displayForm, setDisplayForm] = useState('d-none');
    const [displayFormBool, setDisplayFormBool] = useState(false);
    const [dataSent, setDataSent] = useState(["", ""]);
    const url = 'http://localhost:8000/register'
    function ShowForm() {
        if (displayForm !== 'd-none') {
            setDisplayForm('d-none');
            setDisplayFormBool(false);
        } else {
            setDisplayForm('d-flex');
            setDisplayFormBool(true);
        }
    }
    function HandleRegister(event) {
        setDataSent([event.target[0].value, event.target[1].value]);
        event.preventDefault();
        axios
            .post(url, dataSent, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
            .then(({ data }) => {
                console.log(data);
            });
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
                <Container className={`bg-light row ${displayForm} position-relative rounded`}>
                    <Form method="POST" action={url} onSubmit={HandleRegister}>
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
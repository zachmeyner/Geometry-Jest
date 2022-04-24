import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import click from './../static/clickSubmitScore.mp3'
export default function Register() {
    const [displayForm, setDisplayForm] = useState('d-none');
    const [displayFormBool, setDisplayFormBool] = useState(false);
    const [user, setUser] = useState("");
    const [pw, setPw] = useState("");
    const clickAudio = new Audio(click);
    const url = 'http://127.0.0.1:8000/';
    function ShowForm() {
        if (displayForm !== 'd-none') {
            setDisplayForm('d-none');
            setDisplayFormBool(false);
        } else {
            clickAudio.play()
            setDisplayForm('d-flex');
            setDisplayFormBool(true);
        }
    }
    function HandleRegister() {
        var dataSent = JSON.stringify({ username: user, password: pw });
        axios
            .post(url.concat('register'), dataSent, {
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    Accept: "application/json"
                },
            })
            .then(({ data }) => {
                console.log(data);
            });
    }
    function HandleLogin() {
        var dataSent = JSON.stringify({ username: user, pw: pw, iat: Date.now() });
        axios
            .post(url.concat('login'), dataSent, {
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    Accept: "application/json"
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
                timeout={40}
                classNames="display"
                unmountOnExit
            >
                <Container className={`gj-bg gj-login-form row ${displayForm} position-relative rounded`}>
                    <Form  >
                        <Row className="p-1" >
                            <Col>
                                <Form.Control autoFocus placeholder="Username" name="user" onChange={(e) => {
                                    setUser(e.target.value);
                                }} />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Password" name="pass" onChange={(e) => {
                                    setPw(e.target.value);
                                }} />
                            </Col>
                            <Col sm={1}>
                                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={ShowForm}></button>
                            </Col>
                        </Row>
                        <Row className="p-1">
                            <Col className="float-start m-0">
                                <Button variant="warning" name="register" onClick={HandleRegister}>
                                    Register
                                </Button>
                            </Col>
                            <Col className="float-end m-0">
                                <Button variant="primary" name="login" onClick={HandleLogin}>
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
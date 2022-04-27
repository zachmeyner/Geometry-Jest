import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import click from './../static/clickSubmitScore.mp3'
export default function Register({ score, setScore, url, expire, setExpire, setStart, setRefresh }) {
    const [displayForm, setDisplayForm] = useState('d-none');
    const [displayFormBool, setDisplayFormBool] = useState(false);
    const [user, setUser] = useState("");
    const [pw, setPw] = useState("");
    const [token, setToken] = useState("");
    const [pbScore, setpbScore] = useState(0);
    const [space, setSpace] = useState("d-inline");
    const [logged, setLogged] = useState(false);
    const [show, setShow] = useState("");
    const clickAudio = new Audio(click);
    function ShowForm() {
        if (displayForm !== 'd-none') {
            setSpace("d-inline");
            setDisplayForm('d-none');
            setDisplayFormBool(false);
        } else {
            setSpace("d-none");
            clickAudio.play()
            setDisplayForm('d-block');
            setDisplayFormBool(true);
        }
    }
    function HandleRegister() {
        var dataSent;
        if (score === 0) {
            dataSent = JSON.stringify({ username: user, password: pw });
        } else {
            dataSent = JSON.stringify({ username: user, password: pw, score: pbScore });
        }
        axios
            .post(url.concat('register'), dataSent, {
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    Accept: "application/json"
                },
            })
            .then(({ data }) => {
                HandleLogin(data.token);
            });
    }
    useEffect(() => {
        if (expire && logged) {
            var dataSent;
            if (score > pbScore) {
                dataSent = JSON.stringify({ username: user, token: token, highscore: score })
                console.log(dataSent);
                setpbScore(score);
                axios.put(url.concat('newscore'), dataSent, {
                    headers: {
                        'Content-Type': "application/json; charset=utf-8",
                        Accept: "application/json"
                    },
                });
            }
            setStart(false);
            setExpire(false);
            setScore(10);
        } else if (expire) {
            if (score > pbScore) {
                setpbScore(score);
            }
            setStart(false);
            setExpire(false);
            setScore(10);
        }
    }, [expire, logged, score, pbScore, url, setExpire, token, user, setScore, setpbScore, setStart]);

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
                setToken(data.token);
                setLogged(true);
                setShow("d-none");
                setDisplayFormBool(false);
                if (pbScore > data.current_points) {
                    dataSent = JSON.stringify({ username: user, token: token, highscore: pbScore });
                    console.log(dataSent);
                    axios.put(url.concat('newscore'), dataSent, {
                        headers: {
                            'Content-Type': "application/json; charset=utf-8",
                            Accept: "application/json"
                        },
                    });
                } else {
                    setpbScore(data.current_points);
                }
            });
    }
    return (
        <Container >
            <button className={`gj-button translate-middle ${show}`} onClick={ShowForm}>Submit Score</button>
            <h1 className={((logged) ? "d-block text-white mt-4 me-5" : "d-none")}>Logged as {user}</h1>
            <br className={`${space}`}></br>
            <br className={`${space}`}></br>
            <br className={`${space}`}></br>
            <br className={`${space}`}></br>
            <CSSTransition
                in={displayFormBool}
                timeout={40}
                classNames="display"
                unmountOnExit
            >
                <Container className={`gj-bg gj-login-form ${displayForm} position-relative rounded`}>
                    <Form >
                        <Row className="ms-1">
                            <Col className="p-1">
                                <Form.Control autoFocus placeholder="Username" name="user" onChange={(e) => {
                                    setUser(e.target.value);
                                }} />
                            </Col>
                            <Col className="p-1">
                                <Form.Control placeholder="Password" name="pass" onChange={(e) => {
                                    setPw(e.target.value);
                                }} />
                            </Col>
                            <Col sm={1}>
                                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={ShowForm}></button>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="p-1 float-start m-0">
                                <Button variant="warning" name="register" onClick={HandleRegister}>
                                    Register
                                </Button>
                            </Col>
                            <Col className="p-1 float-end m-0">
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
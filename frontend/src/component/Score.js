import React from "react";
import { Container } from "react-bootstrap";
export default function Score({ score }) {
    return (
        <Container className=" text-light mt-4">
            < h1 > Score: {score}</h1 >
        </Container >
    )
}

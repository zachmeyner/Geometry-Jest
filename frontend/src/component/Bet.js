import React, { useState, useEffect } from "react";
import { Container, ToggleButtonGroup, ToggleButton, Button } from "react-bootstrap";
import click from './../static/clickBet.mp3'
import submit from './../static/betSubmit.mp3'

export default function Bet({ score, bet, setBet, setDisableSlot, setScore, disable, setDisable, setQuestion }) {
    const [other, setOther] = useState(0);
    const clickAudio = new Audio(click);
    const submitAudio = new Audio(submit);

    function handleChange(event) {
        if (event.target.value <= score && event.target.value > 0) {
            setOther(event.target.value);
        } else {
            setOther(0);
        }
    }
    function handleSubmit() {
        if (bet === 0) {
        } else {
            submitAudio.play();
            setScore(score - bet);
            setDisableSlot(false);
            setQuestion([]);
            setDisable(true)
        }
    }
    function handleSelect(value) {
        clickAudio.play();
        if (value === "all") {
            value = score;
        }
        if (value <= score) {
            setBet(value);
        } else {
            setBet(0);
        }
    }
    function otherSelected() {
        setBet(other);
        document.getElementById("otherTA").focus();
    }
    useEffect(() => {
        if (score === 0 && disable === false) {
            setQuestion(["Game Over!"]);
        }
    }, [score, disable, setQuestion]);
    useEffect(() => {
        if (score === 0 && disable === false) {
            setQuestion(["Game Over!"]);
        }
    }, [score, disable, setQuestion]);
    return (
        < Container className="gj-bg p-2 " >
            <br />
            <h3 className="text-white">Choose your bet</h3>
            <ToggleButtonGroup vertical type="radio" name="bets" onChange={handleSelect}  >
                <ToggleButton id="bet1" value={1} className="border" name="one" disabled={disable} autoFocus={true}>
                    1
                </ToggleButton>
                <ToggleButton id="bet5" value={5} className="border" disabled={disable} >
                    5
                </ToggleButton>
                <ToggleButton id="bet10" value={10} className="border" disabled={disable} >
                    10
                </ToggleButton>
                <ToggleButton id="betOther" value={other} onChange={otherSelected} className="border" disabled={disable} >
                    Other <input id="otherTA" value={other} type="number" onChange={handleChange} disabled={disable} />
                </ToggleButton >
                <ToggleButton id="betAll" value="all" className="border" name="all" disabled={disable} >
                    All
                </ ToggleButton>
                <Button variant="warning" type="submit" onClick={handleSubmit} className="border" disabled={disable}>Place Bet  </Button>
            </ToggleButtonGroup>
            <br />
        </Container >
    );
}
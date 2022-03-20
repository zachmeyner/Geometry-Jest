import React, { useState } from "react";
import { Container, ToggleButtonGroup, ToggleButton, Button } from "react-bootstrap";

export default function Bet() {
    const [bet, setBet] = useState(1);
    const [other, setOther] = useState(0);
    const [selected, setSelectd] = useState([false, false, false, false, false])
    function handleChange(event) {
        setOther(event.target.value);
    }
    function handleSubmit() {
        alert(bet);
    }
    function handleSelect(value) {
        setBet(value);
    }
    function otherSelected() {
        setBet(other);
    }
    return (
        < Container className="gj-bg p-2" >
            <br />
            <h3 className="text-white">Choose your bet</h3>
            <ToggleButtonGroup vertical type="radio" name="bets" onChange={handleSelect} >
                <ToggleButton id="bet1" value={1} className="border">
                    1
                </ToggleButton>
                <ToggleButton id="bet5" value={5} className="border" >
                    5
                </ToggleButton>
                <ToggleButton id="bet10" value={10} className="border"  >
                    10
                </ToggleButton>
                <ToggleButton id="betOther" value={other} onSelect={otherSelected} className="border">
                    Other <input id="otherTA" type="number" onChange={handleChange} />
                </ToggleButton >
                <ToggleButton id="betAll" value={0} className="border" >
                    All
                </ ToggleButton>
                <Button variant="warning" type="submit" onClick={handleSubmit} className="border">Place Bet </Button>
            </ToggleButtonGroup>
            <br />
        </Container >
    );
}
import React from "react";
import { Container } from "react-bootstrap";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Timer({ start, setExpire }) {
    const renderTime = ({ remainingTime }) => {
        if (start) {
            if (remainingTime === 0) {
                setExpire(true);
                return <div>Game Over</div>;
            }
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;
            return (
                <div >
                    <div >Remaining</div>
                    <div >{`${minutes}:${seconds}`}</div>
                </div>
            );
        }
    };
    return (
        <Container className="text-white">
            <CountdownCircleTimer
                isPlaying={start}
                duration={240}
                size={200}
                colors={['#e2c600', '#968505', '#6c6007', '#2b2703']}
                colorsTime={[10, 7, 3, 0]}
            >
                {renderTime}
            </CountdownCircleTimer>
        </Container >
    );
}

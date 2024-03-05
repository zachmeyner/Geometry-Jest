import React from "react";
import { Container } from "react-bootstrap";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Timer({ start, setExpire, key, setKey }) {
    // const [show, setShow] = useState("d-block");
    const renderTime = ({ remainingTime }) => {
        if (start) {
            if (remainingTime === 0) {
                setExpire(true);
                return <div>Game Over</div>;
            }
            let minutes = Math.floor(remainingTime / 60);
            let seconds = String(remainingTime % 60).padStart(2, '0');;
            return (
                <div >
                    <div >Remaining</div>
                    <div >{`${minutes}:${seconds}`}</div>
                </div>
            );
        }
    };
    // function HandleClick() {
    //     setSubmit(true);
    //     setKey(prevKey => prevKey + 1);
    //     setDisable(true);
    //     setTimeout(() => {
    //         setDisable(false);
    //     }, 1000);
    // }
    // useEffect(() => {
    //     if (disable) {
    //         setShow("d-none");
    //     } else {
    //         setShow("d-block");
    //     }
    // }, [disable, setShow]);
    return (
        <Container className="text-white w-100 position-relative">
            <CountdownCircleTimer
                isPlaying={start}
                key={key}
                duration={60}
                size={200}
                colors={['#e2c600', '#968505', '#6c6007', '#2b2703']}
                colorsTime={[10, 7, 3, 0]}
                onComplete={() => {
                    setKey(prevKey => prevKey + 1);
                    return true;
                }}
            >
                {renderTime}
            </CountdownCircleTimer>
            {/* <button className={`gj-submitButton ${show}`} onClick={HandleClick}>Reset &amp;<br></br>Submit</button> */}

        </Container >
    );
}

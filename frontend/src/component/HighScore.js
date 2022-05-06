import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios';

export default function HighScore({ url, refresh, setRefresh }) {
    const [leaderboard, setLeaderboard] = useState([
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        },
        {
            username: "",
            highscore: 0
        }
    ]);
    useEffect(() => {
        if (refresh) {
            axios
                .post(url.concat('/'), {
                    headers: {
                        'Content-Type': "application/json; charset=utf-8",
                        Accept: "application/json"
                    },
                })
                .then(({ data }) => {
                    setLeaderboard(data);
                });
            setRefresh(false);
        }
    }, [setLeaderboard, setRefresh, leaderboard, refresh, url]);
    return (
        <Container className="gj-bg text-white h-auto w-100 ">
            <h2> L E A D E R B O A R D</h2>
            <table cellPadding={3} >
                <tr className="fw-bolder text-gold1 ">
                    <td>1)</td>
                    <th>{leaderboard[0].username}</th>
                    <th>{leaderboard[0].highscore}</th>
                </tr>
                <tr className="fw-bold text-gold2">
                    <td>2)</td>
                    <th>{leaderboard[1].username}</th>
                    <th>{leaderboard[1].highscore}</th>
                </tr>
                <tr className="text-gold2">
                    <td>3)</td>
                    <th>{leaderboard[2].username}</th>
                    <th>{leaderboard[2].highscore}</th>
                </tr>
                <tr>
                    <td>4)</td>
                    <th>{leaderboard[3].username}</th>
                    <th>{leaderboard[3].highscore}</th>
                </tr>
                <tr>
                    <td>5)</td>
                    <th>{leaderboard[4].username}</th>
                    <th>{leaderboard[4].highscore}</th>
                </tr>     <tr>
                    <td>6)</td>
                    <th>{leaderboard[5].username}</th>
                    <th>{leaderboard[5].highscore}</th>
                </tr>     <tr>
                    <td>7)</td>
                    <th>{leaderboard[6].username}</th>
                    <th>{leaderboard[6].highscore}</th>
                </tr>     <tr>
                    <td>8)</td>
                    <th>{leaderboard[7].username}</th>
                    <th>{leaderboard[7].highscore}</th>
                </tr>     <tr>
                    <td>9)</td>
                    <th>{leaderboard[8].username}</th>
                    <th>{leaderboard[8].highscore}</th>
                </tr>     <tr>
                    <td>10)</td>
                    <th>{leaderboard[9].username}</th>
                    <th>{leaderboard[9].highscore}</th>
                </tr>
                <tr>
                    <td>11)</td>
                    <th>{leaderboard[10].username}</th>
                    <th>{leaderboard[10].highscore}</th>
                </tr>
                <tr>
                    <td>12)</td>
                    <th>{leaderboard[11].username}</th>
                    <th>{leaderboard[11].highscore}</th>
                </tr>
                <tr>
                    <td>13)</td>
                    <th>{leaderboard[12].username}</th>
                    <th>{leaderboard[12].highscore}</th>
                </tr>
                <tr>
                    <td>14)</td>
                    <th>{leaderboard[13].username}</th>
                    <th>{leaderboard[13].highscore}</th>
                </tr>
                <tr>
                    <td>15)</td>
                    <th>{leaderboard[14].username}</th>
                    <th>{leaderboard[14].highscore}</th>
                </tr>
                <tr>
                    <td>16)</td>
                    <th>{leaderboard[15].username}</th>
                    <th>{leaderboard[15].highscore}</th>
                </tr>
                <tr>
                    <td>17)</td>
                    <th>{leaderboard[16].username}</th>
                    <th>{leaderboard[16].highscore}</th>
                </tr>
                <tr>
                    <td>18)</td>
                    <th>{leaderboard[17].username}</th>
                    <th>{leaderboard[17].highscore}</th>
                </tr>
                <tr>
                    <td>19)</td>
                    <th>{leaderboard[18].username}</th>
                    <th>{leaderboard[18].highscore}</th>
                </tr>
                <tr>
                    <td>20)</td>
                    <th>{leaderboard[19].username}</th>
                    <th>{leaderboard[19].highscore}</th>
                </tr>
            </table>
        </Container >
    );
}
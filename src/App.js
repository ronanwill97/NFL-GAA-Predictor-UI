import Fixtures from "./screens/Fixtures";
import {useEffect, useState} from "react";
import axios from "axios";
import Form from "./screens/Form";
import React from "react";
import Leaderboard from "./screens/Leaderboard";


function App() {

    const round = 1
    const year = 2024
    const [responses, setResponses] = useState({})
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isDetailsEntered, setIsDetailsEntered] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [leaderboardData, setLeaderboardData] = useState(null);


    useEffect(() => {
            if (isCompleted) {
                axios.post(process.env.REACT_APP_SERVICE_HOST_NAME + '/api/responses', {
                    name,
                    phoneNumber,
                    responses,
                    round,
                    year
                }).then(r => console.log(r))
            } else if (leaderboardData === null) {
                axios({
                    "url": process.env.REACT_APP_SERVICE_HOST_NAME + '/api/tally-responses', "oarams": {
                        "round": round, "year": year
                    }
                }).then((response) => {
                    setLeaderboardData(response.data)
                })
            }
        },
        [isCompleted, name, phoneNumber, responses, leaderboardData]);

    if (!isDetailsEntered) {
        return <Form setPhoneNumber={setPhoneNumber} setName={setName} setIsDetailsEntered={setIsDetailsEntered}/>
    } else if (!isCompleted) {
        return <Fixtures responses={responses} setIsCompleted={setIsCompleted} setResponses={setResponses} round={round}
                         year={year}/>
    }
    if (isCompleted && isDetailsEntered) {
        return <Leaderboard data={leaderboardData}/>
    }
}

export default App;

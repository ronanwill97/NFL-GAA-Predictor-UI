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

    const apiUrl = process.env['APPSETTING_DJANGO_SERVICE_HOST_NAME']


    useEffect(() => {
            if (isCompleted) {
                axios.post(apiUrl + '/api/responses', {
                    name,
                    phoneNumber,
                    responses,
                    round,
                    year
                }).then(r => console.log(r))
            } else if (isCompleted && isDetailsEntered && leaderboardData === null) {
                axios({
                    "url": `${apiUrl}/api/tally-responses`, "params": {
                        "round": round, "year": year
                    }
                }).then((response) => {
                    setLeaderboardData(response.data)
                })
            }
        },
        [isCompleted, name, phoneNumber, responses, leaderboardData, apiUrl, isDetailsEntered]);

    if (!isDetailsEntered) {
        return <Form setPhoneNumber={setPhoneNumber} setName={setName} setIsDetailsEntered={setIsDetailsEntered}/>
    } else if (!isCompleted) {
        return <Fixtures apiUrl={apiUrl} responses={responses} setIsCompleted={setIsCompleted}
                         setResponses={setResponses} round={round}
                         year={year}/>
    }
    if (isCompleted && isDetailsEntered && leaderboardData != null) {
        return <Leaderboard data={leaderboardData}/>
    }
}

export default App;

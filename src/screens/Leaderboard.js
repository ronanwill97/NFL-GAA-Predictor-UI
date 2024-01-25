import React, {useState, useEffect} from 'react';
import axios from "axios";

const Leaderboard = (props) => {
    const [data, setData] = useState(null)

    const {apiUrl, round, year} = props

    useEffect(() => {

        axios({
            "url": `${apiUrl}/api/tally-responses`, "params": {
                "round": round, "year": year
            }
        }).then((response) => {
            setData(response.data)
        })

    }, [data, apiUrl, round, year])
    if (data != null) {
        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">Leaderboard</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.points}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <h1>THANKS</h1>
    }
};

export default Leaderboard;

import React, {useState, useEffect} from "react";
import axios from 'axios';

const Fixtures = (props) => {
    // Create a state to store the user's selections
    const [roundData, setRoundData] = useState(null);

    const round = props.round
    const year = props.year

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        props.setResponses({...props.responses, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data
        props.setIsCompleted(true)

    };

    useEffect(() => {

        if (roundData === null) {
            console.log(props.apiUrl)
            axios({
                "url": `${props.apiUrl}/api/get-fixtures`, "params": {
                    "round": round,
                    "year": year
                }
            }).then((response) => {
                setRoundData(response.data)
            })
        }
    }, [roundData, year, round])
    if (roundData == null || Object.keys(roundData).length === 0) {
        return null;
    } else {
        return (
            <div style={styles.fixturesContainer}>
                <h2 style={styles.header}>{'Fixtures - Round ' + round}</h2>
                <p style={styles.description}>Please submit your responses before the
                    deadline: {new Date(roundData.deadline).toLocaleString()}</p>
                <form id="predictions" onSubmit={handleSubmit} style={styles.form}>
                    {Object.entries(roundData.division).map(([division, matches]) => (
                        <div key={division} style={styles.divisionContainer}>
                            <h3>Division {division}</h3>
                            <div style={styles.matchContainer}>
                                {matches.map((match, index) => (
                                    <div key={index} style={styles.matchContainer}>
                                        <label
                                            style={styles.questionTitle}>{match.homeTeam + ' vs ' + match.awayTeam}</label>
                                        <label>
                                            <input
                                                type="radio"
                                                style={styles.radioInput}
                                                name={`${match.homeTeam}_${match.awayTeam}`}
                                                value={match.homeTeam}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            {match.homeTeam}
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                style={styles.radioInput}
                                                name={`${match.homeTeam}_${match.awayTeam}`}
                                                value={match.awayTeam}
                                                onChange={handleInputChange}
                                            />
                                            {match.awayTeam}
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                style={styles.radioInput}
                                                name={`${match.homeTeam}_${match.awayTeam}`}
                                                value="Draw"
                                                onChange={handleInputChange}
                                            />
                                            Draw
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </form>
                <button style={styles.button} form="predictions" type="submit">Submit</button>
            </div>
        );
    }
}

const styles = {
    header: {
        color: 'navy',
        textAlign: 'center',
        marginBottom: '20px',
    },
    description: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        margin: "0 25% 0 25%"
    },
    fixturesContainer: {
        display: "flex",
        flexFlow: "column",
    },
    matchContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexFlow: "column",
    },
    divisionContainer: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-around",
        border: '1px solid #ddd',
        padding: '5px',
        margin: '5px',
        borderRadius: '5px'
    },
    questionTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    radioInput: {
        marginRight: '5px',
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        margin: "10px",
        width: "10%",
        alignSelf: "center",
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    }
};

export default Fixtures;
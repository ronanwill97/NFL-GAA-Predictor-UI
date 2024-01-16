import React, {useState, useEffect} from "react";
import axios from "axios";

const Fixtures = (props) => {
    // Create a state to store the user's selections
    const [roundData, setRoundData] = useState(null);
    const round = 1

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        props.setFormData({...props.formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data
        console.log(props.formData);
        props.setIsCompleted(true);
    };

    useEffect(() => {
        if (roundData === null) {
            axios({
                "url": `gaa-nfl-predictions.azurewebsites.net/fixtures`, "params": {
                    "round": round
                }
            }).then((response) => {
                setRoundData(response.data)
            })
        }
    })
    if (roundData == null) {
        return null;
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h2 style={styles.header}>{'Fixtures - Round ' + round}</h2>
                    <p>Please submit your responses before the
                        deadline: {new Date(roundData.deadline).toLocaleString()}</p>
                    {Object.entries(roundData.fixtures).map(([division, matches]) => (
                        <div key={division}>
                            <h3>{division}</h3>
                            {matches.map((teams, index) => (
                                <div style={styles.matchContainer} key={index}>
                                    <label style={styles.questionTitle}>{teams[0] + ' vs ' + teams[1]}</label>
                                    <label>
                                        <input
                                            type="radio"
                                            style={styles.radioInput}
                                            name={`${teams[0]} vs ${teams[1]}`}
                                            value={teams[0]}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {teams[0]}
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            style={styles.radioInput}
                                            name={`${teams[0]} vs ${teams[1]}`}
                                            value={teams[1]}
                                            onChange={handleInputChange}
                                        />
                                        {teams[1]}
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            style={styles.radioInput}
                                            name={`${teams[0]} vs ${teams[1]}`}
                                            value="Draw"
                                            onChange={handleInputChange}
                                        />
                                        Draw
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button style={styles.button} type="submit">Submit</button>
                </form>
            </div>
        )
    }
};
const styles = {
    form: {
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '500px',
        width: '100%'
    },
    input: {
        width: '100%', // Full width - padding
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    select: {
        width: '100%', // Full width - padding
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        width: 'auto' // Adjust as needed
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    matchContainer: {
        width: '100%', // Full width
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #eee',
        borderRadius: '4px',
        backgroundColor: '#fff',
        boxSizing: 'border-box'
    },
    questionTitle: {
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    radioContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px'
    },
    radioInput: {
        marginRight: '10px'
    }
};


export default Fixtures;

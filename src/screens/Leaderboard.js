import React from 'react';

const Leaderboard = ({data}) => {
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
};

export default Leaderboard;

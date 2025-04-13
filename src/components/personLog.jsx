
import React from "react";

const PersonLog = ({ logs }) => {

    return (
        <div>
            <h2>Work Log</h2>
            <ul>
                {logs?.map((log, i) => (
                <li key={i}>
                    <h3>{log.title}</h3>
                    <p>{new Date(log.date).toLocaleDateString()}</p>
                    <p>{log.description}</p>
                </li>
            ))}

            </ul>
        </div>
    );
};

export default PersonLog;

import React from "react";

const PersonLog = ({ member }) => {

    return (
        <div>
            <h2>Arbeidslogg</h2>
            <ul>
                {member.logs?.map((log, i) => (
                <li key={i}>
                    <h3>{log.title}</h3>
                    <p>{newDate(log.date).toLocaleDateString()}</p>
                    <p>{log.content}</p>
                </li>
            ))}

            </ul>
        </div>
    );
};

export default PersonLog;
import { useEffect, useState } from "react";
import sanityClient from "../sanityClient";

const GroupLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "workLog"] | order(_createdAt desc){
            title,
            description,
            _createdAt,
            "authorName": author->name
            }
        `)
        .then((data) => setLogs(data));
    }, []);

    //Fått hjälp av chatgpt att räkna ut hur många timmar sedan loggen blev postad.
    const timeAgo = (createdAt) => {
        const now = new Date();
        const logDate = new Date(createdAt);
        const diffInMs = now - logDate;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            return `${diffInMinutes} minutes ago`;
        }
        return `${Math.floor(diffInHours)} hours ago`;
    }

    return (
        <section>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        <p>{new Date(log._createdAt).toLocaleDateString()}</p>
                        <p>{log.authorName}</p>
                        <div>
                            <p>{log.title}</p>
                            <p>{log.description}</p>
                        </div>
                        <p>{timeAgo(log._createdAt)}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default GroupLog;
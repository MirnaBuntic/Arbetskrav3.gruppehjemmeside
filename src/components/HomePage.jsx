import { useState, useEffect } from "react";
import sanityClient from "../sanityClient";
import GroupLog from "./GroupLog";

const HomePage = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
          *[_type == "group"][0] {
            members[]->{
            name,
            "slug": slug.current,
            "imageUrl": image.asset->url,
            email
            }
          }  
        `)
        .then((data) => setMembers(data?.members || []));
    }, []);

    return (
        <main>
            <section>
                <h2>Group members</h2>
                <div>
                    {members.map((member) => (
                        <div key={member.slug}>
                            <img src={member.imageUrl} alt={member.name} />
                            <h3>{member.name}</h3>
                            <p>{member.email}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Group Work Log</h2>
                <GroupLog />
            </section>
        </main>
    );
};

export default HomePage;
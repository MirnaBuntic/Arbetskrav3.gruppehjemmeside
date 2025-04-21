import { useState, useEffect } from "react";
import sanityClient from "../sanityClient";
import GroupLog from "./GroupLog";
import { Link } from "react-router-dom";
import '../styles/homePage.scss';

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
        <>
            <section className="membersection">
                <h2>Group members</h2>
                {members.map((member) => (
                <Link key={member._id} to={`/profile/${member.slug}`}>
                    <article className="memberarticle" key={member.slug}> 
                        <img src={member.imageUrl} alt={member.name} />
                        <h3>{member.name}</h3>
                        <p>{member.email}</p>
                    </article>
                    </Link>
                ))}
            </section>
            <section className="grouplogg_header">
                <h2>Group Work Log</h2>
                <GroupLog />
            </section>
        </>
    );
};

export default HomePage;
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../sanityClient";


const PersonalPage = () => {
    const { slug } = useParams ();
    const [member, setMember] = useState (null);
    
    useEffect(() => {

        console.log("Slug from URL:", slug);

        sanityClient.fetch(
            `*[_type == "member" && slug.current == $slug][0]{
            name, 
            email,
            bio,
            interests,
            "imageUrl": image.asset->url,
            "logs": *[_type == "workLog" && author._ref == ^._id] | order(_createdAt desc){
                title,
                description,
                _createdAt
                }
            }`, 
            
            { slug }
        )
            
            .then ((data) => {
                console.log("fetched member:", data);
                setMember(data);

            })

            .catch((error) => console.error ("sanity error:", error));
        }, [slug]);


    if (!member) {
        return <p>Loading...</p>
    }


    return (
    
        <section>
            <img src={member.imageUrl}></img>
            <h2>{member.name}</h2>
            <p>{member.email}</p>

            <section>
                <h3>Biography</h3>
                <p>{member.bio}</p>

                <h3>Interests</h3>
                <ul>
                    {member.interests?.map((interest, i) => (
                        <li key={i}>{interest}</li>
                    ))}
                </ul>

                <h3>Log</h3>
                <ul>
                    {member.logs.map((log, i) => (
                        <li key={i}>
                            {log.title} {log.description}
                            {new Date(log._createdAt).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </section>
        </section>
        
    );
   
};


export default PersonalPage;
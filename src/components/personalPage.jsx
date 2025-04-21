import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../sanityClient";
import '../styles/personalPage.scss';




const PersonalPage = () => {
    const { slug } = useParams ();
    const [member, setMember] = useState (null);
    
    useEffect(() => {

        console.log("riktig slug", slug);

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
                console.log("fetch fungerer:", data);
                setMember(data);

            })

        }, [slug]); //(useeffect kjøres kun når slug endres)


    if (!member) { //Fikk hjelp av chatGPT til å forstå hvorfor ikke koden fungerte etter jeg skrev alt over. Limte inn koden og fikk dette 
        //som en av alternativene til debugging
        return <p>Loading...</p>
    }

    //fikk lenge opp kun loading. Etterhvert så jeg at jeg hadde lagt feil navn på noen av nøkkelverdiene. Gikk derfor inn i sanity schematypes
    //og så at biography hadde bio som name og ikke biography. Endret litt på småfeil nedover og fikk deretter opp alt innhold
    //på personalpage. 

    return (
    
        <section className="Biografi">
            <img src={member.imageUrl}></img>
            <div className="Designcontainer">

           
            <h2>{member.name}</h2>
            <p>{member.email}</p>
            </div>

            <section className="About">
                <h3>Biography</h3>
                <p>{member.bio}</p>

                <h3>Interests</h3>
                <ul>
                    {member.interests?.map((interest, i) => (
                        <li key={i}>{interest}</li>
                    ))}
                </ul>

                <h3>Log</h3>
                <ul className="Memberlog2">
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
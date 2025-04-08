import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanityClient';
import '../styles/header.scss';

const Header = () => {
  const [gruppenavn, setGruppenavn] = useState('');
  const [gruppenummer, setGruppenummer] = useState('');
  const [medlemmer, setMedlemmer] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "group"][0]{
          groupName,
          members[]->{
            name,
            "slug": slug.current
          }
        }`
      )
      .then((data) => {
        const [navn, nummer] = data?.groupName?.split(' – ') || ['Team X', ''];
        setGruppenavn(navn);
        setGruppenummer(nummer);
        setMedlemmer(data?.members || []);
      });
  }, []);

  return (
    <header className="header">
      <div className="header__title">
        {gruppenavn} {gruppenummer && `– ${gruppenummer}`}
      </div>

      <nav className="header__nav">
        <Link to="/">Hjem</Link>

        {medlemmer.length > 0 && <div className="nav-divider" />}

        {medlemmer.map((member) => {
            const key = member.slug || member._id || `${member.name}-${Math.random()}`;
            return (
                <Link key={key} to={`/profile/${member.slug || member._id}`}>
                {member.name?.split(" ")[0]}
                </Link>
            );
            })}




      </nav>
    </header>
  );
};

export default Header;

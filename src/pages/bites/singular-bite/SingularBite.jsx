import React, { useContext, useEffect, useState } from 'react';
import { Button, Image } from 'semantic-ui-react';
import { useParams } from 'react-router';
import CustomHeader from '../../page-elements/header/CustomHeader';
import BitesContext from '../../../utils/contexts/bitesContext';
import AddTitle from '../../page-elements/page-utils/title/AddTitle';
import BiteStats from './stats/BiteStats';

/**
 * renders all the data about a particular bite
 * @return {JSX.Element} a header and info about the bite, with a background image
 * @constructor
 */
function SingularBite() {
  const { slug } = useParams();
  const bites = useContext(BitesContext);
  const [bite, setBite] = useState({});

  /* loads the bite to display */
  useEffect(() => {
    setBite(bites.find((el) => el.slug === slug));
  }, [bites]);

  /* handle case where a bite does not exist */
  if (!bite) {
    return (
      <div>
        <h3>No bite found with slug {slug}</h3>
      </div>
    );
  }

  return (
    <div className='singular-bite'>
      <AddTitle name={bite.name} />

      <div className='absolute background-image'>
        {/* image with absolute positioning to use in the background, allows for opacity */}
        <Image
          src={`/img/bites/${bite.photo ? bite.photo.path : ''}`}
          alt={bite.photo ? bite.photo.alt : 'bite background image'}
          rounded
        />
      </div>

      <div style={{ width: '60vw', margin: '0 auto' }}>
        <CustomHeader
          mainContent={bite.name}
          subHeader={bite.summary}
          divided
        />

        {/* give a chunk of information about the bite */}
        <BiteStats bite={bite} />
        <Button>Book now</Button>
      </div>
    </div>
  );
}

export default SingularBite;

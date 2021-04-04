import React from 'react';
import { Image } from 'semantic-ui-react';
import CustomHeader from '../page-elements/header/CustomHeader';
import Reviews from './reviews/Reviews';

/**
 * creates a header for a bite
 * @param bite the bite to use
 * @returns {JSX.Element} customized header for the bite card
 */
export const BiteHeader = ({ name, duration, price }) => (
  <CustomHeader
    mainContent={<p className='bite-name'>{name}</p>}
    subHeader={<p>{`${duration} minutes | $${price}`}</p>}
    secondary
  />
);

/**
 * @param bite
 * @returns {JSX.Element} the main content of the bite card
 */
export const BiteContent = ({ photo: { alt, path: imgSrc }, summary }) => (
  <div className='bite-content'>
    <div className='relative bite-image'>
      <Image src={`/img/bites/${imgSrc}`} alt={alt} rounded />
    </div>
    {/* use semantic green site variable instead of the default 👇 html green */}
    <h2 className='brand-script bite-name' style={{ color: '@green' }}>
      {summary}
    </h2>
  </div>
);

/* simple description component */
export const BiteDescription = ({ description }) => <p>{description}</p>;

/* adds the reviews at the end */
export const BiteFooter = (bite) => <Reviews bite={bite} />;

import React from 'react';
import { Icon } from 'semantic-ui-react';
import HalfStar from '../../page-elements/custom-icons/HalfStar';

const numReviews = 5;
/**
 * Creates a component to display the number of reviews, rounded to the nearest half, in star icons. If there are no
 * reviews, five empty stars are rendered
 * @param bite the bite whose reviews to show
 * @return {JSX.Element} 5 stars in row along with the number of reviews
 * @constructor
 */
function Reviews({ bite }) {
  const renderStars = () => {
    // default behaviour for a bite with no ratings
    if (bite.numRatings === 0) {
      let count = 0;
      return Array.from({ length: numReviews }, () => {
        count += 1;
        return <Icon name='star outline' color='green' key={count} />;
      });
    }

    const stars = [];
    // get closest .5 to display stars
    const starsRoundedToHalf =
      (Math.round((bite.averageRatings * 10) / 5) * 5) / 10;

    // add the integer number of stars
    for (let i = 1; i <= starsRoundedToHalf; i++) {
      stars.push(<Icon name='star' color='green' key={i} />);
    }

    // add half a star if necessary
    if (!Number.isInteger(starsRoundedToHalf)) {
      stars.push(<HalfStar key='half_star' />);
    }

    // make sure there are exactly 5 stars returned
    while (stars.length < numReviews) {
      stars.push(<Icon name='star outline' key={stars.length + numReviews} />);
    }
    return stars.slice(0, numReviews);
  };

  return (
    <div className='flex'>
      {renderStars()}
      <span>({bite.numRatings})</span>
    </div>
  );
}

export default Reviews;

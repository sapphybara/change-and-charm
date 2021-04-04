import { Icon, Statistic } from 'semantic-ui-react';
import React from 'react';

/**
 * renders special statistic to show stars and other review info
 * @param bite the bite to show
 * @returns {JSX.Element}
 */
export default function renderReviewStats({ bite }) {
  // show default ui if the bite has no reviews
  if (bite.numRatings === 0) {
    return (
      <Statistic>
        <Statistic.Value>
          <span>0&nbsp;</span>
          <Icon name='star outline' />
        </Statistic.Value>
        <Statistic.Label>No Reviews</Statistic.Label>
      </Statistic>
    );
  }

  // otherwise show info about bite reviews
  return (
    <Statistic text>
      <Statistic.Value>
        <span>{bite.averageRatings}&nbsp;</span>
        <Icon name='star' />
      </Statistic.Value>
      <Statistic.Label>Reviews (out of {bite.numRatings})</Statistic.Label>
    </Statistic>
  );
}

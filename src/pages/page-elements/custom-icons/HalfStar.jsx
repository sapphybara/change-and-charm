import React from 'react';
import { Icon } from 'semantic-ui-react';

/**
 * creates a half full star by combining semantic ui stars
 * @return {JSX.Element}
 * @constructor
 */
export default function HalfStar() {
  return (
    <div className='relative'>
      {/* add a normal star */}
      <Icon name='star half full' color='green' key='half_full_star' />
      {/* add an empty full star on top of the first star, preventing a tiny white line between the two stars */}
      <Icon
        name='star outline'
        key='half_empty_star'
        color='green'
        flipped='horizontally'
        className='absolute left-0'
      />
    </div>
  );
}

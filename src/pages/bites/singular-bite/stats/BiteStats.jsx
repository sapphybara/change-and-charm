import React from 'react';
import { Grid, Segment, Statistic } from 'semantic-ui-react';
import ReviewStats from './ReviewStats';

/**
 * renders statistics about the given bite, as well as the description
 * @param bite
 * @return {JSX.Element} semantic ui segment containing the statistics
 * @constructor
 */
export default function BiteStats({ bite }) {
  const { price, duration, coach } = bite;

  return (
    <Segment>
      <Grid columns={2} divided>
        <Grid.Column>
          <div className='height-of-parent center-items'>
            <Statistic.Group horizontal color='purple' size='small'>
              <Statistic>
                <Statistic.Value>{price}</Statistic.Value>
                <Statistic.Label>dollars</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{duration}</Statistic.Value>
                <Statistic.Label>minutes</Statistic.Label>
              </Statistic>
              <Statistic text value={coach} label='Coach' />
              <ReviewStats bite={bite} />
            </Statistic.Group>
          </div>
        </Grid.Column>

        <Grid.Column>
          <div className='right-align description center-items float-right height-of-parent'>
            <p>{bite.description}</p>
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

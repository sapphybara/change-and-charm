import React, { useContext } from 'react';
import { Card } from 'semantic-ui-react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import SingularBite from './singular-bite/SingularBite';
import CustomCard from '../page-elements/card/CustomCard';
import BitesContext from '../../utils/contexts/bitesContext';
import {
  BiteContent,
  BiteDescription,
  BiteFooter,
  BiteHeader,
} from './BiteCardSetup';
import ScrollToTop from '../page-elements/page-utils/scroll/ScrollToTop';

/**
 * renders an overview page for all the bites, with cards displaying an overview about the bites
 * @return {JSX.Element} page containing the group of cards as well as a route for the singular bites, with a param
 * called slug for the slugs in the database
 * @constructor
 */
function BitesPage() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  const { path, url } = useRouteMatch();
  const bites = useContext(BitesContext);

  /* creates a list of cards for all the bites */
  const renderBites = () =>
    bites.map((bite) => {
      const { slug } = bite;

      const biteOptions = {
        as: Link,
        to: `${url}/${slug}`,
        cardColor: 'purple',
        customClass: 'bite-card',
      };

      // create a card for the bite with its children components
      return (
        <CustomCard
          key={slug}
          Header={() => BiteHeader(bite)}
          Content={() => BiteContent(bite)}
          Description={() => BiteDescription(bite)}
          Footer={() => BiteFooter(bite)}
          options={biteOptions}
        />
      );
    });

  return (
    <Switch>
      <Route exact path={path}>
        <Card.Group itemsPerRow={2} className='card-padding'>
          {renderBites()}
        </Card.Group>
      </Route>
      <Route exact path={`${path}/:slug`}>
        <ScrollToTop />
        <SingularBite />
      </Route>
    </Switch>
  );
}

export default BitesPage;

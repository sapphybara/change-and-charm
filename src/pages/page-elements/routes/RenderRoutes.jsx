import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BitesPage from '../../bites/BitesPage';
import Home from '../../home/Home';
import logo from '../../../styles/branding/logo.svg';
import AddTitle from '../page-utils/title/AddTitle';

const homeKey = 'home';
const bitesKey = 'bites';

/* the routes that are contained in the navbar */
export const NAVBAR_ROUTES = [
  {
    name: homeKey,
    path: '/',
    icon: {
      src: logo,
      alt: 'logo',
    },
  },
  {
    name: bitesKey,
    path: `/${bitesKey}`,
  },
];

/**
 * creates the main routes for the app
 * @return {JSX.Element} switch containing all the routes app endpoints
 * @constructor
 */
function RenderRoutes() {
  return (
    <Switch>
      <Route exact path={NAVBAR_ROUTES[0].path}>
        <AddTitle name={homeKey} />
        <Home />
      </Route>
      <Route path={NAVBAR_ROUTES[1].path}>
        <AddTitle name={bitesKey} />
        <BitesPage />
      </Route>
    </Switch>
  );
}

export default RenderRoutes;

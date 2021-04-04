import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Icon, Menu } from 'semantic-ui-react';
import startCase from 'lodash/startCase';

/**
 *
 * @param {[]} NAVBAR_ROUTES the routes for the navbar
 * @param {React.ReactNode} children props.children
 * @return {JSX.Element} navbar component with navlinks around the routes defined in NAVBAR_ROUTES
 * @constructor
 */
function Navbar({ NAVBAR_ROUTES, children }) {
  /**
   * renders the Menu items from the routes
   * @returns {JSX.Element}
   */
  const renderMenuLinks = () =>
    NAVBAR_ROUTES.map((page) => {
      // create an icon for the home tab
      if (page.icon) {
        return (
          <Menu.Item
            name={page.name}
            key={page.name}
            as={NavLink}
            to={page.path}
            activeClassName='active'
            header
            exact
          >
            <img src={page.icon.src} alt={page.icon.alt} />
            {startCase(page.name)}
          </Menu.Item>
        );
      }

      return (
        <Menu.Item
          name={page.name}
          key={page.name}
          as={NavLink}
          to={page.path}
          activeClassName='active'
        >
          {startCase(page.name)}
        </Menu.Item>
      );
    });

  return (
    <div className='center-align relative'>
      <div className='navbar'>
        <Menu fixed='top' color='green'>
          {renderMenuLinks()}
          <Menu.Item position='right' key='auth'>
            <Button icon>
              <Icon name='sign in' />
            </Button>
            <Button icon compact>
              <Icon name='sign-out' />
            </Button>
          </Menu.Item>
        </Menu>
      </div>

      <div className='main-content'>{children}</div>
    </div>
  );
}

export default Navbar;

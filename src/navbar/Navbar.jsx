import React from 'react';
import { Menu } from 'semantic-ui-react';
import ROUTES from '../utils/Routes';
import './navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  
  /**
   * handles menu changing
   * @param e event
   * @param name name of the menu item clicked
   */
  handleMenuItemClick = (e, { name }) => {
    this.props.onPageChange(name);
  };
  
  /**
   * renders the Menu items from the routes
   * @returns {React.ReactNode}
   */
  renderMenuItems = () => {
    // the page we are on
    const activePage = this.props.activePage;
    
    return ROUTES.map(page => {
      // create an icon for the home tab
      if (page.icon) {
        return (
          <Menu.Item name={page.name} onClick={this.handleMenuItemClick} key={page.key}
                     active={activePage === page.name} className={'imageMenu'} header as={Link} to={'/'}>
            <img src={page.icon.src} alt={page.icon.alt} className={'image'}/>
            {page.label}
          </Menu.Item>
        );
      } else {
        return (
          <Menu.Item name={page.name} active={activePage === page.name} onClick={this.handleMenuItemClick}
                     key={page.key} position={page.position} as={Link} to={'/' + page.name}>
            {page.label}
          </Menu.Item>);
      }
    });
  };
  
  render() {
    return (
      <Menu defaultActiveIndex={0} fixed={'top'} color={'green'}>
        {this.renderMenuItems()}
      </Menu>
    );
  };
}

export default Navbar;
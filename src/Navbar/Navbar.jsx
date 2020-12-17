import React from 'react';
import { Menu } from 'semantic-ui-react';

export default class Navbar extends React.Component {
  
  handleClick = (e, { name }) => {
    console.log(name);
  };
  
  render() {
    return (
      <Menu>
        <Menu.Item onClick={this.handleClick} name={'home'}>
          Home
        </Menu.Item>
        <Menu.Item onClick={this.handleClick} name={'about'}>
          About
        </Menu.Item>
      </Menu>
    );
  }
}
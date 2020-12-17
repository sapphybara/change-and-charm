import './App.css';
import Navbar from './Navbar/Navbar';
import React from 'react';
import logo from './Branding/logo.svg';

const routes = {
  'home': {
    key: 'home',
    label: 'Home'
  },
  'about': {
    key: 'about',
    label: 'About'
  }
};

export default class App extends React.Component {
  
  state = { activePage: routes.home };
  
  render() {
    return (
      <div className="App">
        <Navbar activePage={this.state.activePage}/>
        <h2>Here is a header</h2>
        <br/>
        <p>Heyyy</p>
        <img alt={'logo'} src={logo} style={{'width': '500px'}}/>
      </div>
    );
  }
};
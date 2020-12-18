import './App.css';
import Navbar from './navbar/Navbar.jsx';
import React from 'react';
import ROUTES from './utils/Routes';

export default class App extends React.Component {
  
  state = {
    activePage: ROUTES[0].name, // the current page, used for the router
  };
  
  /**
   * changes current page
   * @param activePage name of the new page that was selected
   */
  handlePageChange = activePage => {
    this.setState({ activePage });
  };
  
  render() {
    return (
      <div className="App">
        <div className={'Navbar'}>
          <Navbar activePage={this.state.activePage} onPageChange={this.handlePageChange}/>
        </div>
        
        <div className={'MainContent'}>
          <h2>Change & Charm</h2>
          <p>The bite-sized makeover botique</p>
        </div>
      </div>
    );
  }
};
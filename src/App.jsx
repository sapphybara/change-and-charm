import './App.css';
import Navbar from './navbar/Navbar.jsx';
import React from 'react';
import ROUTES from './utils/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const PAGE_TITLE = 'Change & Charm';

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
      <Router>
        <div className="App">
          <div className={'Navbar'}>
            <Navbar activePage={this.state.activePage} onPageChange={this.handlePageChange}/>
          </div>
    
          <div className={'MainContent'}>
            <Switch>
              {ROUTES.map(route => {
                const path = route.name === 'home' ? '/' : '/' + route.name;
                const ComponentName = route.component;
                return <Route exact path={path} key={route.key} render={() => <ComponentName name={route.label} />}/>
              })}
            </Switch>
          </div>
    
        </div>
      </Router>
    );
  }
}
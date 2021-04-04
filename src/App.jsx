import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import RenderRoutes, {
  NAVBAR_ROUTES,
} from './pages/page-elements/routes/RenderRoutes';
import BitesContext from './utils/contexts/bitesContext';
import './styles/less/app.less';

/**
 * a component which controlls the global state of the app and renders the routes
 * @return {JSX.Element} router component with dynamic routes, which in turn can have nested routes on them
 * @constructor
 */
function App() {
  const [bites, setBites] = useState([]);

  /**
   * load bites from backend
   */
  const getBites = async () => {
    let response = await fetch(`${process.env.REACT_APP_PROXY}/api/bites`);
    response = await response.json();
    if (response.status !== 'success') {
      throw new Error(`server returned code ${response.statusCode || 404}`);
    }
    const { data } = response.data;
    return data;
  };

  /**
   * equivalent to componentDidMount
   */
  useEffect(() => {
    // get the bites when page loads
    getBites().then(setBites);
  }, []);

  return (
    <Router>
      <Navbar NAVBAR_ROUTES={NAVBAR_ROUTES}>
        <BitesContext.Provider value={bites}>
          <RenderRoutes />
        </BitesContext.Provider>
      </Navbar>
    </Router>
  );
}

export default App;

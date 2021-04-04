import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CustomHeader from '../page-elements/header/CustomHeader';

/**
 * homepage for the app
 * @return {JSX.Element}
 * @constructor
 */
function Home() {
  return (
    <div>
      <CustomHeader
        mainContent={process.env.REACT_APP_PAGE_TITLE}
        subHeader='The bite-sized makeover boutique'
      />
      <Button as={Link} to='/bites'>
        Bites!
      </Button>
    </div>
  );
}

export default Home;

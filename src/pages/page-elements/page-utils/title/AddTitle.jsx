import React from 'react';
import Helmet from 'react-helmet';
import startCase from 'lodash/startCase';

/**
 * adds a title to the document
 * @param name the name for the title
 * @return {JSX.Element} special page title created with Helmet
 * @constructor
 */
function AddTitle({ name }) {
  return (
    <Helmet>
      <title>
        {startCase(name)} | {process.env.REACT_APP_PAGE_TITLE}
      </title>
    </Helmet>
  );
}

export default AddTitle;

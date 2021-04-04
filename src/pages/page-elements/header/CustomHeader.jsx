import React from 'react';
import { Divider, Header } from 'semantic-ui-react';

/**
 * creates a header to be used across the app
 * @param mainContent the main content to be displayed in the header
 * @param subHeader any additional info for the header
 * @param [divided=false] whether the header has a divider underneath it
 * @param [secondary=false] the header can be formatted with less importance on the page
 * @return {JSX.Element} header combining all the components
 * @constructor
 */
function CustomHeader({
  mainContent,
  subHeader,
  divided = false,
  secondary = false,
}) {
  // creates similar headings around the app
  // NOTE I don't use the default props.children because I want to customize classnames for the different parts of
  //  the header

  return (
    <Header className='custom-header'>
      <div className={secondary ? 'secondary' : 'primary'}>
        <Header.Content>
          <h1 className='upper-case brand-script'>{mainContent}</h1>
        </Header.Content>
        <Header.Subheader className='center-align'>
          <span>{subHeader}</span>
        </Header.Subheader>
        {divided && <Divider className='divider-margin' />}
      </div>
    </Header>
  );
}

export default CustomHeader;

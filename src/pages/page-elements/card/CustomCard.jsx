import React from 'react';
import { Card } from 'semantic-ui-react';

/**
 * creates a custom card to be used across the app
 * @param Header the header for the card
 * @param Content the main content of the card
 * @param Description description of the card
 * @param Footer absolutely positioned footer at the base of the card
 * @param options special options for the semantic ui card
 * @return {JSX.Element}
 * @constructor
 */
function CustomCard({ Header, Content, Description, Footer, options }) {
  const { as, to, cardColor, customClass } = options;

  return (
    <Card
      raised
      centered
      as={as}
      to={to}
      color={cardColor}
      className={customClass}
    >
      <Card.Header style={{ padding: '10px 30px' }}>
        <div className='card-header'>
          <Header />
        </div>
      </Card.Header>

      <Card.Content>
        <Content />
      </Card.Content>

      <Card.Description>
        <Description />
      </Card.Description>

      <br />
      <footer className='justify-center absolute card-footer'>
        <Footer />
      </footer>
    </Card>
  );
}

export default CustomCard;

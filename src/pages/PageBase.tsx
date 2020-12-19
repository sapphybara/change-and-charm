import * as React from 'react';
import { PAGE_TITLE } from '../App';

interface Props {
  name: string
}

// using typescript so we can have an abstract class
export abstract class PageBase extends React.Component<Props> {
  
  /**
   * set the title of the pages based on their name
   */
  componentDidMount() {
    document.title = this.props.name + PAGE_TITLE;
  }
  
  render() {
    return (
      <div>
        <h2>Change and Charm - {this.props.name}</h2>
        The makeover boutique
      </div>
    );
  }
}
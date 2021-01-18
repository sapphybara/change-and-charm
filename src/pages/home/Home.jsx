import { PageBase } from '../PageBase.tsx';
import * as React from 'react';
import './Home.css';
import { PAGE_TITLE } from '../../App.jsx';

export default class Home extends PageBase {
  render() {
    return (
      <div>
        <h1 className={'brand-script'}>{PAGE_TITLE}</h1>
        The bite-sized makeover boutique
      </div>
    );
  }
}

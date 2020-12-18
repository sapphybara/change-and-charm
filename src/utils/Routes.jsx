import { SnakeToCapital } from './HumanReadableText';
import logo from '../branding/logo.svg';

// the different pages for the router, rendered in the navbar
const ROUTES = [{
  key: 'home',
  name: 'home',
  label: SnakeToCapital('home'),
  icon: {
    src: logo,
    alt: 'logo'
  }
}, {
  key: 'about',
  name: 'about_us',
  label: SnakeToCapital('about_us')
}, {
  key: 'services',
  name: 'services',
  label: SnakeToCapital('services')
}, {
  key: 'book',
  name: 'book_now',
  label: SnakeToCapital('book_now')
}, {
  key: 'contact',
  name: 'contact_us',
  label: SnakeToCapital('contact_us')
}, {
  key: 'login',
  name: 'login',
  label: SnakeToCapital('login'),
  position: 'right'
}];

export default ROUTES;
import { SnakeToCapital } from './HumanReadableText';
import logo from '../visuals/branding/logo.svg';

// all the page components
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Services from '../pages/services/Services';
import Book from '../pages/book/Book';
import Contact from '../pages/contact/Contact';
import Login from '../pages/login/Login';

// names for all the pages
const homeKey = 'home';
const aboutKey = 'about_us';
const servicesKey = 'services';
const bookKey = 'book_now';
const contactKey = 'contact_us';
const loginKey = 'login';

// the different pages for the router, rendered in the navbar
const ROUTES = [
  {
    key: homeKey,
    name: homeKey,
    label: SnakeToCapital(homeKey),
    icon: {
      src: logo,
      alt: 'logo',
    },
    component: Home,
  },
  {
    key: aboutKey,
    name: aboutKey,
    label: SnakeToCapital(aboutKey),
    component: About,
  },
  {
    key: servicesKey,
    name: servicesKey,
    label: SnakeToCapital(servicesKey),
    component: Services,
  },
  {
    key: bookKey,
    name: bookKey,
    label: SnakeToCapital(bookKey),
    component: Book,
  },
  {
    key: contactKey,
    name: contactKey,
    label: SnakeToCapital(contactKey),
    component: Contact,
  },
  {
    key: loginKey,
    name: loginKey,
    label: SnakeToCapital(loginKey),
    position: 'right',
    component: Login,
  },
];

export default ROUTES;

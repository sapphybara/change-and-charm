import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Component used to scroll to the top of the page so the previous scroll isn't remembered. from
 * https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
 * @return {null}
 * @constructor
 */
export default function ScrollToTop() {
  // Component used to scroll to the top of the page so the previous scroll isn't remembered
  // from https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

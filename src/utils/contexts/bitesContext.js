import { createContext } from 'react';

/* create a context to allow the bites to be in a global state */
const BitesContext = createContext([]);
BitesContext.displayName = 'BitesContext';

export default BitesContext;

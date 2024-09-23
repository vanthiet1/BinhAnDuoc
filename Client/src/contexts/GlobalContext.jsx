import React, { createContext, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './UserContext';
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [visited, setVisited] = useState(false);
  return (
    <GlobalContext.Provider
      value={visited}
    >
      <GoogleOAuthProvider clientId={'1060538151130-fugnan197mqpku6dp2a9vlhnb0vi9l1j.apps.googleusercontent.com'}>
        <UserProvider>
          {children}
        </UserProvider>
      </GoogleOAuthProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
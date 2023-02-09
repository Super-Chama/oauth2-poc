import {
  OAUTH_ISSUER,
  OUATH_SCOPES,
  OAUTH_CLIENT_ID,
  OAUTH_CALLBACK_URL,
} from '@env';
import useAuth from './hooks/auth';
import React, {useState, createContext} from 'react';

const {Provider, Consumer} = createContext();

const ContextProvider = ({children}) => {
  const config = {
    issuer: OAUTH_ISSUER,
    clientId: OAUTH_CLIENT_ID,
    redirectUrl: OAUTH_CALLBACK_URL,
    additionalParameters: {},
    scopes: OUATH_SCOPES.split(','),
  };

  const [isLoading, setIsLoading] = useState(false);
  const {authState, handleAuthorize, handleRefresh, handleRevoke} =
    useAuth(config);

  const signIn = async () => {
    setIsLoading(true);
    await handleAuthorize();
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    await handleRevoke();
    setIsLoading(false);
  };

  const refresh = async () => {
    setIsLoading(true);
    await handleRefresh();
    setIsLoading(false);
  };

  return (
    <Provider
      value={{
        config,
        isLoading,
        authState,
        signIn,
        signOut,
        refresh,
      }}>
      {children}
    </Provider>
  );
};

export {ContextProvider, Consumer};

import {
  Page,
  Form,
  Button,
  Heading,
  FormLabel,
  FormValue,
  ButtonContainer,
} from './components';
import useAuth from './auth';
import React, {useMemo} from 'react';
import {
  OAUTH_ISSUER,
  OUATH_SCOPES,
  OAUTH_CLIENT_ID,
  OAUTH_CALLBACK_URL,
} from '@env';

const App = () => {
  const config = {
    issuer: OAUTH_ISSUER,
    clientId: OAUTH_CLIENT_ID,
    redirectUrl: OAUTH_CALLBACK_URL,
    additionalParameters: {},
    scopes: OUATH_SCOPES.split(','),
  };

  const {authState, handleAuthorize, handleRefresh, handleRevoke} =
    useAuth(config);

  const showRevoke = useMemo(() => {
    return !!authState.accessToken;
  }, [authState]);

  return (
    <Page>
      {authState.accessToken ? (
        <Form>
          <FormLabel>accessToken</FormLabel>
          <FormValue>{authState.accessToken}</FormValue>
          <FormLabel>accessTokenExpirationDate</FormLabel>
          <FormValue>{authState.accessTokenExpirationDate}</FormValue>
          <FormLabel>refreshToken</FormLabel>
          <FormValue>{authState.refreshToken}</FormValue>
          <FormLabel>scopes</FormLabel>
          <FormValue>{authState.scopes.join(', ')}</FormValue>
        </Form>
      ) : (
        <Heading>
          {authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}
        </Heading>
      )}

      <ButtonContainer>
        {!authState.accessToken ? (
          <>
            <Button
              onPress={() => handleAuthorize('identityserver')}
              text="Authorize IdentityServer"
              color="#DA2536"
            />
            <Button
              onPress={() => handleAuthorize('auth0')}
              text="Authorize Auth0"
              color="#DA2536"
            />
          </>
        ) : null}
        {authState.refreshToken ? (
          <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
        ) : null}
        {showRevoke ? (
          <Button onPress={handleRevoke} text="Revoke" color="#EF525B" />
        ) : null}
      </ButtonContainer>
    </Page>
  );
};

export default App;

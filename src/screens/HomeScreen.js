import React from 'react';
import {Consumer} from '../context';
import Form from '../components/Form';
import Page from '../components/Page';
import Button from '../components/Button';
import FormValue from '../components/FormValue';
import FormLabel from '../components/FormLabel';
import ActionContainer from '../components/ActionContainer';

export default function HomeScreen() {
  return (
    <Consumer>
      {ctx => {
        return (
          <Page>
            <Form>
              <FormLabel>accessToken</FormLabel>
              <FormValue>{ctx.authState.accessToken}</FormValue>
              <FormLabel>accessTokenExpirationDate</FormLabel>
              <FormValue>{ctx.authState.accessTokenExpirationDate}</FormValue>
              <FormLabel>refreshToken</FormLabel>
              <FormValue>{ctx.authState.refreshToken}</FormValue>
              <FormLabel>scopes</FormLabel>
              <FormValue>{ctx.authState.scopes.join(', ')}</FormValue>
            </Form>

            <ActionContainer style={{flexDirection: 'row'}}>
              <Button
                color="#00ac51"
                onPress={() => ctx.refresh()}
                text="Refresh Token"
              />
              <Button
                color="#f44336"
                onPress={() => ctx.signOut()}
                text="Sign Out"
              />
            </ActionContainer>
          </Page>
        );
      }}
    </Consumer>
  );
}

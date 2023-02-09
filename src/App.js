import {
  OAUTH_ISSUER,
  OUATH_SCOPES,
  OAUTH_CLIENT_ID,
  OAUTH_CALLBACK_URL,
} from '@env';
import useAuth from './hooks/auth';
import React, {useState} from 'react';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen
            name="Loader"
            component={LoadingScreen}
            options={{headerShown: false}}
          />
        ) : authState.accessToken === null ? (
          // No token found, user isn't signed in
          <Stack.Screen name="SignIn" options={{headerShown: false}}>
            {props => <LoginScreen {...props} signIn={signIn} />}
          </Stack.Screen>
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

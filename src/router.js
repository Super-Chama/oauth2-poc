import React from 'react';
import {Consumer} from './context';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const router = () => {
  return (
    <Consumer>
      {ctx => {
        return (
          <NavigationContainer>
            <Stack.Navigator>
              {ctx.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen
                  name="Loader"
                  component={LoadingScreen}
                  options={{headerShown: false}}
                />
              ) : ctx.authState.accessToken === null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                  name="SignIn"
                  component={LoginScreen}
                  options={{headerShown: false}}
                />
              ) : (
                // User is signed in
                <Stack.Screen name="Home" component={HomeScreen} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        );
      }}
    </Consumer>
  );
};

export default router;

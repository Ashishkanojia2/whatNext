import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import LandingPage from '../screens/landing';
import BottomNavigation from '../Navigations/BottomNavigation';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreeen from '../screens/auth/ForgotPasswordScreen';
import FavScreen from '../screens/bottomTab/Favorite/FavScreen';
import * as Sentry from '@sentry/react-native';
const Stack = createNativeStackNavigator();
const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});
const index = () => {
  const navigationRef = createNavigationContainerRef();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigationRef);
      }}
    >
      <Stack.Navigator
        initialRouteName="BottomNav"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreeen}
        />
        <Stack.Screen name="FavScreen" component={FavScreen} />
        <Stack.Screen name="BottomNav" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;

const styles = StyleSheet.create({});

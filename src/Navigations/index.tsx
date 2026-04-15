import {View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import authStack from './AuthStack/AuthStack';
import MainStack from './MainStack/MainStack';
const Stack = createNativeStackNavigator();
const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});
const index = () => {
  const navigationRef = createNavigationContainerRef();
  const [checking, setChecking] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'MainStack' | 'AuthStack'>('AuthStack');


  

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigationRef);
      }}
    >
      <Stack.Navigator
        initialRouteName={"MainStack"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthStack" component={authStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default index;
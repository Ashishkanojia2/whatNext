import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import authStack from './AuthStack/AuthStack';
import mainStack from './MainStack/mainStack';
import localStore from '../utils/AsynsStorage';
const Stack = createNativeStackNavigator();
const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});
const index = () => {
  const navigationRef = createNavigationContainerRef();
  const [checking, setChecking] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'MainStack' | 'AuthStack'>('AuthStack');

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const token = await localStore({ method: 'get', key: 'token' });
        if (!mounted) return;
        if (token) {
          setInitialRoute('MainStack');
        } else {
          setInitialRoute('AuthStack');
        }
      } catch (e) {
        console.log('error checking token', e);
        setInitialRoute('AuthStack');
      } finally {
        if (mounted) setChecking(false);
      }
    };
    check();
    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigationRef);
      }}
    >
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthStack" component={authStack} />
        <Stack.Screen name="MainStack" component={mainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default index;
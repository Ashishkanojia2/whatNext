import { View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack/MainStack';
import localStore from '../utils/AsynsStorage';
import Colors from '../helper/Colors';
import AuthStack from './AuthStack/AuthStack';
import { navigationRef } from '../helper/NavigationHelper';
const Stack = createNativeStackNavigator();

const index = () => {
  const [isloggedIn, setIsloggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    tokenValue()
  }, [])

  const tokenValue = async () => {
    const token = await localStore({ method: 'get', key: 'token' })
    console.log("what we recived in token", token);
    
    if (token) {
      setIsloggedIn(true)
    } else {
      setIsloggedIn(false)
    }
  }
  if (isloggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.secondary} />
      </View>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isloggedIn ? 'MainStack' : 'AuthStack'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default index;
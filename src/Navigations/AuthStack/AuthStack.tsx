import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../../screens/auth/SignupScreen';
import ForgotPasswordScreeen from '../../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import MainStack from '../MainStack/MainStack';
import localStore from '../../utils/AsynsStorage';
const Stack = createNativeStackNavigator();
const authStack = () => {



  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreeen}
      />
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

export default authStack;
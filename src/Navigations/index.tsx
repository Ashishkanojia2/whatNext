import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LandingPage from '../screens/landing'
import BottomNavigation from  "../Navigations/BottomNavigation"
const Stack = createNativeStackNavigator()
const index = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='LandingPage' screenOptions={{headerShown:false}}>
        <Stack.Screen name='LandingPage'  component={LandingPage}/>
        <Stack.Screen name='BottomNav'  component={BottomNavigation}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default index

const styles = StyleSheet.create({})
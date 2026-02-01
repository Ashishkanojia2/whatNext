import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../../screens/bottomTab/home/HomeScreen'
import ProductScreen from '../../screens/bottomTab/product/ProductScreen'
import ProfileScreen from '../../screens/bottomTab/profile/ProfileScreen'
import CartScreen from '../../screens/bottomTab/cart/CartScreen'
const Tab = createBottomTabNavigator()
const index = () => {
  return (
   <Tab.Navigator screenOptions={{headerShown:false}}>
    <Tab.Screen name='HomeScreen' component={HomeScreen}/>
    <Tab.Screen name='ProductScreen' component={ProductScreen}/>
    <Tab.Screen name='CartScreen' component={CartScreen}/>
    <Tab.Screen name='ProfileScreen' component={ProfileScreen}/>
   </Tab.Navigator>
  )
}

export default index
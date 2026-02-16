import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/bottomTab/home/HomeScreen';
import ProductScreen from '../../screens/bottomTab/product/ProductScreen';
import ProfileScreen from '../../screens/bottomTab/profile/ProfileScreen';
import Images from '../../assets/Images';
import fonts from '../../assets/fonts';
import { fp } from '../../helper/Responsive';
import Colors from '../../helper/Colors';
import BagScreen from '../../screens/bottomTab/cart/BagScreen';
import FavScreen from '../../screens/bottomTab/Favorite/FavScreen';
const Tab = createBottomTabNavigator();
const index = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) =>
            focused
              ? handleImage(Images.activeHome)
              : handleImage(Images.inactiveHome),
          tabBarLabelStyle: style.lable,
          tabBarActiveTintColor: Colors.third,
        }}
      />
      <Tab.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) =>
            focused
              ? handleImage(Images.activeShop)
              : handleImage(Images.inactiveShop),
          tabBarLabelStyle: style.lable,
          tabBarActiveTintColor: Colors.third,
        }}
      />
      <Tab.Screen
        name="BagScreen"
        component={BagScreen}
        options={{
          tabBarLabel: 'Bag',
          tabBarIcon: ({ focused }) =>
            focused
              ? handleImage(Images.activeBag)
              : handleImage(Images.inactiveBag),
          tabBarLabelStyle: style.lable,
          tabBarActiveTintColor: Colors.third,
        }}
      />
      <Tab.Screen
        name="FavScreen"
        component={FavScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused }) =>
            focused
              ? handleImage(Images.activeFav)
              : handleImage(Images.inactiveFav),
          tabBarLabelStyle: style.lable,
          tabBarActiveTintColor: Colors.third,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) =>
            focused
              ? handleImage(Images.activeProfile)
              : handleImage(Images.inactiveProfile),
          tabBarLabelStyle: style.lable,
          tabBarActiveTintColor: Colors.third,
        }}
      />
    </Tab.Navigator>
  );
};
const style = StyleSheet.create({
  lable: {
    fontFamily: fonts.Light,
    fontSize: fp(12),
    marginTop: 10,
  },
});

export default index;
const handleImage = (img: any) => {
  return <Image source={img} style={{ height: 25, width: 25 }} />;
};

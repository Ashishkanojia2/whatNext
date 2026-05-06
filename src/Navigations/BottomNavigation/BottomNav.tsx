import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/bottomTab/home/HomeScreen';
import ProfileScreen from '../../screens/bottomTab/profile/ProfileScreen';
import Images from '../../assets/Images';
import fonts from '../../assets/fonts';
import { fp } from '../../helper/Responsive';
import Colors from '../../helper/Colors';
import BagScreen from '../../screens/bottomTab/cart/BagScreen';
import FavScreen from '../../screens/bottomTab/Favorite/FavScreen';
import ShopScreen from '../../screens/bottomTab/shop/ShopScreen';
const Tab = createBottomTabNavigator();
const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { height: 90 }}}
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
        name="ShopScreen"
        component={ShopScreen}
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
          tabBarLabel: 'My Account',
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
    // marginTop: 10,
  },
});

export default BottomNav;
const handleImage = (img: any) => {
  return <Image source={img} style={{ height: 25, width: 25 }} />;
};

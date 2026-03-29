import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavScreen from '../../screens/bottomTab/Favorite/FavScreen';
import HomeSectionSecScreeen from '../../screens/bottomTab/home/HomeSectionSecScreeen';
import NewCollection from '../../screens/bottomTab/home/NewCollection';
import BottomNav from '../BottomNavigation';
import MyOrder from '../../screens/bottomTab/profile/MyOrder';
import Payments from '../../screens/bottomTab/profile/Payments';
import Notofication from '../../screens/bottomTab/profile/Notofication';
import Setting from '../../screens/bottomTab/profile/Setting';
import AboutUs from '../../screens/bottomTab/profile/AboutUs';
import Feedback from '../../screens/bottomTab/profile/Feedback';
import TermAndService from '../../screens/bottomTab/profile/TermAndService';
import FAQ from '../../screens/bottomTab/profile/FAQ';
import ContsctUs from '../../screens/bottomTab/profile/ContsctUs';
const Stack = createNativeStackNavigator();
const mainStack = () => {
  return (
      <Stack.Navigator
        initialRouteName="BottomNav"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="FavScreen" component={FavScreen} />
        <Stack.Screen name="BottomNav" component={BottomNav} />
        <Stack.Screen name="HomeSectionSecScreeen" component={HomeSectionSecScreeen} />
        <Stack.Screen name="NewCollection" component={NewCollection} />
       
        <Stack.Screen name="MyOrder" component={MyOrder} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Notofication" component={Notofication} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="TermAndService" component={TermAndService} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="ContactUs" component={ContsctUs} />

      </Stack.Navigator>
  );
};
export default mainStack;

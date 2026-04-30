import React from 'react';
import RootStack from './src/Navigations/RootStack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Colors from './src/helper/Colors';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary2 }} edges={['top','bottom']}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.primary2} />
          <RootStack />
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

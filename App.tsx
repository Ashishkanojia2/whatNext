import React from 'react';
import Navigation from './src/Navigations';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Colors from './src/helper/Colors';
import { Provider } from 'react-redux';
import store from './src/Redux/store';



const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary2 }} edges={['top']}>
          <Navigation />
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

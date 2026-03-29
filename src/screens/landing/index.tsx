import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import localStore from '../../utils/AsynsStorage';

const index = ({ navigation }: any) => {
 useFocusEffect(
  useCallback(() => {
    const checkLogin = async () => {
      const loggedIn = await localStore({method:"get", key:"token"})
      console.log('landing - stored token:', loggedIn);

      // AsyncStorage returns a string or null. Treat any non-empty string as logged in.
      if (loggedIn) {
        // In your navigator the main app entry is named 'BottomNav'
        navigation.reset({
          index: 0,
          routes: [{ name: 'mainStack' }],
        });
      } else {
        // Navigate to the login screen for authentication
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
    };

    checkLogin();
  }, [])
);
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: '#284686ff',
          padding: 10,
          borderRadius: 7,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AuthStack')}
      >
        <Text style={{ fontSize: 15, color: '#fff' }}>{'What Next ->'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';

const index = ({navigation}:any) => {
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
        onPress={()=>navigation.navigate('BottomNav')}
      >
        <Text style={{ fontSize: 15, color: '#fff' }}>{'What Next ->'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

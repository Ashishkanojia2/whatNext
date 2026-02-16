import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const index = ({ navigation }: any) => {
 
  
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
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={{ fontSize: 15, color: '#fff' }}>{'What Next ->'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

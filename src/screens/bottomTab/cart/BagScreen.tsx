import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const BagScreen = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        throw new Error('Test crash from button');
      }}
      style={{justifyContent:"center" , alignItems:"center" , flex:1}}
    >
      <Text>CartScreen</Text>
    </TouchableOpacity>
  );
};

export default BagScreen;

const styles = StyleSheet.create({});

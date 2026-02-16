import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../helper/Colors';
import Images from '../assets/Images';
import { fp, hp } from '../helper/Responsive';
import fonts from '../assets/fonts';

const { width, height } = Dimensions.get('window');

interface CustomeTextInputProps extends TextInputProps {
  mainContinerStyle?: StyleProp<ViewStyle>;
  title?: string;
}
const CustomeTextInput: React.FC<CustomeTextInputProps> = ({
  value,
  mainContinerStyle,
  onChangeText,
  placeholder,
  title = 'Email',
  inputMode,
  ...rest
}) => {
  return (
    <View style={[styles.rootContianer, mainContinerStyle]}>
      {value && <Text style={styles.title}>{title}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.placeHolder}
        placeholder={title}
        style={styles.txtInputContainer}
        inputMode={inputMode}
        {...rest}
      />
    </View>
  );
};

export default CustomeTextInput;

const styles = StyleSheet.create({
  rootContianer: {
    backgroundColor: Colors.white,
    width: '100%',
    height: hp(60),
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 5,
    shadowOpacity: 0.1,
    borderRadius: 5,
  },
  txtInputContainer: {
    fontSize: fp(15),
    fontFamily: fonts.Regular,
  },
  title: {
    fontSize: fp(10),
    color: Colors.placeHolder,
    fontFamily: fonts.Regular,
  },
});

import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Colors from '../helper/Colors';
import { fp, hp } from '../helper/Responsive';
import fonts from '../assets/fonts';
interface CustomeButtonProps {
  lable: string | number;
  buttonStyle?: StyleProp<ViewStyle>;
  lableStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const CustomeButton = ({
  lable,
  buttonStyle,
  lableStyle,
  onPress,
}: CustomeButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.rootContainer, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.lable, lableStyle]}>{lable}</Text>
    </TouchableOpacity>
  );
};

export default CustomeButton;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.third,
    borderRadius: 30,
    width: '100%',
    height: hp(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lable: {
    fontSize: fp(17),
    fontFamily: fonts.Medium,
    color: Colors.white,
  },
});

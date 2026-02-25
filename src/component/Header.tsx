import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../helper/Colors';
import Images from '../assets/Images';
import { fp, wp } from '../helper/Responsive';
import { useNavigation } from '@react-navigation/native';

type CutomeHeaderProps = {
  title?: string;
  showProfile?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ImageProps;
  rightIcon?: ImageProps;
  leftImageStyle?: StyleProp<Image>;
  leftIconPress?: () => void;
  headerTxt?: StyleProp<TextStyle>;
  backIconColor?:any
};

const Header: React.FC<CutomeHeaderProps> = ({
  title,
  showProfile = false,
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon,
  rightIcon,
  leftIconPress,
  headerTxt,
  backIconColor = "#000"
}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.rootContianer}>
      {showLeftIcon ? (
        <TouchableOpacity activeOpacity={0.7} onPress={()=> leftIconPress ?? navigation.goBack()}>
          <Image
            source={Images.backIcon}
            tintColor={backIconColor}
            style={{
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {title ? (
        <Text style={[styles.header, headerTxt]}>{title}</Text>
      ) : (
        <View />
      )}
      {rightIcon ? <View /> : <View />}
    </View>

  );
};

export default Header;

const styles = StyleSheet.create({
  rootContianer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // backgroundColor:
  },
  header: {
    color: Colors.black,
    fontSize: fp(25),
    fontWeight: '700',
    textAlign: 'center',
  },
});

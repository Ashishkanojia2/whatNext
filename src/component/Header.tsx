import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../helper/Colors';
import Images from '../assets/Images';

type CutomeHeaderProps = {
  title?: string;
  showProfile?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ImageProps;
  rightIcon?: ImageProps;
  leftImageStyle?: StyleProp<Image>;
  leftIconPress?: () => void;
};

const index: React.FC<CutomeHeaderProps> = ({
  title,
  showProfile = false,
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon,
  rightIcon,
  leftIconPress,
}) => {
  return (
    <View style={styles.rootContianer}>
      {showLeftIcon ? (
        <TouchableOpacity activeOpacity={0.7} onPress={leftIconPress}>
          <Image
            source={Images.backIcon}
            tintColor={'#000'}
            style={{
              height: 25,
              width: 25,
              marginLeft: -5,
            }}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {title ? <Text style={styles.header}>{title}</Text> : <View />}
      {rightIcon ? <View /> : <View />}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  rootContianer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  header: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});

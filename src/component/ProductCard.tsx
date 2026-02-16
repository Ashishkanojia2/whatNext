import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../helper/Colors';
import { fp, hp, wp } from '../helper/Responsive';
import Images from '../assets/Images';
import fonts from '../assets/fonts';
import { ProductProps } from '../screens/bottomTab/home/HomeScreen';
const { width, height } = Dimensions.get('window');

const ProductCard: React.FC<ProductProps> = ({
  category,
  description,
  image,
  price,
  rating,
  title,
  index,
}) => {
  return (
    <TouchableOpacity
      style={styles.RootContainer}
      key={index}
      onPress={() => {}}
    >
      <Image
        source={{ uri: image }}
        style={{ width: '100%', height: '70%', borderRadius: 10 }}
        resizeMode="stretch"
      />
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: 5 }).map(() => (
          <Image
            source={Images.ratingStar}
            style={{ height: hp(15), width: wp(15) }}
            resizeMode="center"
          />
        ))}
        <Text>{rating?.count}</Text>
      </View>
      <Text style={styles.lable}>T-shirt</Text>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.amt}>Price ${price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
const commonStyle = StyleSheet.create({
  txt: {
    fontFamily: fonts.Regular,
    color: Colors.black,
    fontSize: fp(15),
  },
});

const styles = StyleSheet.create({
  RootContainer: {
    flex: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 8,
    height: height / 2.8,
  },
  lable: {
    ...commonStyle.txt,
    fontFamily: fonts.Regular,
    color: Colors.placeHolder,
  },
  title: {
    ...commonStyle.txt,
    fontFamily: fonts.SemiBold,
    marginVertical: 5,
  },
  amt: {
    ...commonStyle.txt,
  },
});

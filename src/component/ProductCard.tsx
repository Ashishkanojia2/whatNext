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
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

const ProductCard: React.FC<ProductProps> = ({
  category,
  description,
  image,
  price,
  rating,
  title,
  index,
  productLike =false,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={styles.RootContainer}
      key={index}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#e5e4e7ff', '#dfddddff']}
        style={{ borderRadius: 10, height: '70%', alignItems: 'center', overflow:"visible" }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: '95%', height: '95%' }}
          resizeMode="stretch"
        />
      <TouchableOpacity activeOpacity={0.7} style={styles.likeProduct}>
        <Image source={!productLike ? Images.inactiveFav : Images.activeFav} style={{ height: 20, width: 20 }} />
      </TouchableOpacity>
      </LinearGradient>
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
    width:width/2
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
  likeProduct: {
    borderRadius: 100,
    backgroundColor: Colors.white,
    shadowOpacity: 0.1,
    width: '20%',
    height: '16%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:"flex-end",
    position:"absolute",
    bottom:-20,
    zIndex:10
    
  },
});

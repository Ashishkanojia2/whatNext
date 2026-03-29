import {
  Dimensions,
  Image,
  ImageBackground,
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
import { ProductProps } from '../helper/interface';
const { width, height } = Dimensions.get('window');

interface ProductCardProps {
  item: ProductProps;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, index }: { item: ProductProps, index: number }) => {
  return (
    <TouchableOpacity
      id={item?.id}
      style={styles.RootContainer}
      key={index}
      onPress={item?.onPress}
      activeOpacity={0.8}
    >
      <View
        style={{
          backgroundColor: '#dfddddff',
          borderRadius: 10,
          height: '70%',
          alignItems: 'center',
          overflow: 'visible',
          justifyContent: 'center',
        }}
      >
        <ImageBackground
          source={
            index % 3 == 0
              ? require('.././assets/Images/productBoy.png')
              : require('.././assets/Images/productGirl.png')
          }
          style={{ width: '100%', height: '100%' }}
          resizeMode="stretch"
        >
          {true && (
            <View
              style={[
                styles.discountTag,
                {
                  backgroundColor:
                    "Discount"  == 'Discount' ? Colors.third : Colors.black,
                },
              ]}
            >
              <Text style={styles.discountTxt}>
                {"Discount" == 'Discount' ? '20%' : 'New'}
              </Text>
            </View>
          )}

        </ImageBackground>


        <TouchableOpacity activeOpacity={0.7} style={styles.likeProduct}>
          <Image
            source={!item?.productLike ? Images.inactiveFav : Images.activeFav}
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: 5 }).map(() => (
          <Image
            source={Images.ratingStar}
            style={{ height: hp(15), width: wp(15) }}
            resizeMode="center"
          />
        ))}
        <Text>{item?.rating?.count}</Text>
      </View>
      <Text style={styles.lable}>T-shirt</Text>
      <Text style={styles.title} numberOfLines={2}>
        {item?.title}
      </Text>
      <Text style={styles.amt}>Price ${item?.price}</Text>
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
    marginHorizontal: 10,
    marginVertical: 8,
    height: height / 2.6,
    width: width / 2,
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
    height: '17%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: -20,
    zIndex: 10,
  },
  discountTag: {
    backgroundColor: Colors.third,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    position: 'relative',
    zIndex: 1,
    margin: 5,
  },
  discountTxt: {
    ...commonStyle,
    textAlign: 'center',
    color: Colors.white,
  },
});

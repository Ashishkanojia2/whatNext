import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import React from 'react';
import Colors from '../helper/Colors';
import { fp, hp, wp } from '../helper/Responsive';
import Images from '../assets/Images';
import fonts from '../assets/fonts';
import { ProductProps } from '../helper/interface';
import { useNavigation } from '@react-navigation/native';
import CustomeButton from './CustomeButton';
const { width, height } = Dimensions.get('window');

interface ProductCardProps {
  item: ProductProps;
  index: number;
  wishListHandler?: (product: ProductProps) => void
  wishlist?: ProductProps[];
}

const ProductCard = ({
  item,
  index,
  wishListHandler,
  wishlist
}: ProductCardProps) => {
  const navigation = useNavigation<any>()
  return (
    <TouchableOpacity
      id={item?.id}
      style={styles.RootContainer}
      onPress={() => navigation.navigate('ProductScreen', { productId: item?._id })}
      activeOpacity={0.8}
    >
      <View
        style={{
          borderRadius: 10,
          height: '58%',
        }}
      >
        <ImageBackground
          source={item?.imageUrl ? { uri: item?.imageUrl?.url } : require('.././assets/Images/productGirl.png')}
          style={{ flex:1, borderRadius: 10 }}
          resizeMode='contain'
        >
          {true && (
            <View
              style={[
                styles.discountTag,
                {
                  backgroundColor:
                    "Discount" == 'Discount' ? Colors.third : Colors.black,
                },
              ]}
            >
              <Text style={styles.discountTxt}>
                {"Discount" == 'Discount' ? '20%' : 'New'}
              </Text>
            </View>
          )}

        </ImageBackground>

        <TouchableOpacity activeOpacity={0.7} style={styles.likeProduct} onPress={() => wishListHandler && wishListHandler(item)}>
          <Image
            source={wishlist?.some((p) => p._id === item._id) ? Images.activeFav : Images.inactiveFav}
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>


      <Text style={styles.lable} >{item?.companyName}</Text>
      <Text style={styles.title} numberOfLines={2}>{item?.productName} </Text>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginHorizontal: 5 }}>{item?.rating}</Text>

        {Array.from({ length: 5 }).map((_, i) => (
          <Image
            key={i}
            source={Images.ratingStar}
            style={{ height: hp(15), width: wp(15) }}
            tintColor={Colors.ratingStart}
            resizeMode="center"
          />
        ))}


      </View>
      <Text style={styles.amt}>₹{item?.price}</Text>
      <CustomeButton lable={"Add to bag"} buttonStyle={styles.addtoCartBtn} lableStyle={{fontSize:fp(14)}}/>
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
    marginHorizontal: 10,
    marginVertical: 8,
    height: height / 2.3,
    width: width / 2.2,
  },
  lable: {
    ...commonStyle.txt,
    fontFamily: fonts.Regular,
    color: Colors.black,
    fontWeight: "bold"
  },
  title: {
    ...commonStyle.txt,
    fontFamily: fonts.Regular,
    marginVertical: 5,
  },
  amt: {
    ...commonStyle.txt,
    fontFamily: fonts.SemiBold,
    fontSize: fp(16)
  },
  likeProduct: {
    borderRadius: 100,
    backgroundColor: Colors.white,
    shadowOpacity: 0.1,
    width: wp(35),
    height: hp(35),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: -15,
    zIndex: 10,
    elevation:10
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
  addtoCartBtn: {
    height: hp(30),
    width: "80%",
    alignSelf: "center",
    marginTop:5
  }
});

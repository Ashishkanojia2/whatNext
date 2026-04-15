import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { use, useCallback, useState } from 'react';
import ProductCard from '../../../component/ProductCard';
import RestApi from '../../../Api/RestApi';
import { useFocusEffect } from '@react-navigation/native';
import Images from '../../../assets/Images';
import { fp, hp } from '../../../helper/Responsive';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import CustomeButton from '../../../component/CustomeButton';
import { ProductProps } from '../../../helper/interface';
import { useDispatch } from 'react-redux';
import { setuserData } from '../../../Redux/reducers/UserReducer';
import { useAppDispatch } from '../../../Redux/reducers/hooks';

const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [likedProduct, setLikedProduct] = useState<ProductProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      getAllProduct();
    }, []),
  );

  const getAllProduct = async () => {
    console.log('is api hit');

    try {
      const res = await RestApi({
        method: 'GET',
        endpoint: 'product/allProducts',
      });
      if (res.status === 200) {
        setProduct(res.result);
      }
    } catch (error) {
      console.log('homeSceen error: ', error);
    }
  };

  const renderItem = ({ item, index, }: {
    item: ProductProps;
    index: number;
  }) => {
    return (
      <ProductCard item={item} index={index} />
    );
  };

  const testRedux = () => {
    const data = {
      name: "Ashish Kanojia",
      email: "kanojiaashish100@gmail.com",
      phone: "1234567890"
    }
    dispatch(setuserData(data))
  }

  return (
    <ScrollView
      style={styles.RootContainer}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={Images.homeBanner}
        style={{
          width: '100%',
          height: height / 1.8,
          justifyContent: 'flex-end',
          paddingBottom: 30,
          gap: 20,
        }}
        resizeMode="cover"
      >
        <Text style={styles.header1}>{`Fashion \nSale`}</Text>
        <CustomeButton
          lable={'check'}
          onPress={() => navigation.navigate('HomeSectionSecScreeen')}
          buttonStyle={{ width: width / 2.5, height: hp(40), marginLeft: 10 }}
        />
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginVertical: 20,
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={styles.header2}>New</Text>
          <Text style={styles.lable}>You've never seen it before!</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => testRedux()}>
          <Text style={styles.viewProduct}>View all test Redux</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default HomeScreen;
const commonStyle = StyleSheet.create({
  txt: {
    color: Colors.black,
    fontFamily: fonts.SemiBold,
    fontSize: fp(34),
  },
  lable: {
    color: Colors.placeHolder,
    fontSize: fp(13),
    fontFamily: fonts.Light,
  },
});
const styles = StyleSheet.create({
  RootContainer: {
    flex: 1,
  },
  header1: {
    fontSize: fp(40),
    color: Colors.white,
    fontFamily: fonts.SemiBold,
    marginLeft: 10,
  },
  header2: {
    ...commonStyle.txt,
  },
  lable: {
    ...commonStyle.lable,
  },
  viewProduct: {
    ...commonStyle.lable,
    color: Colors.black,
  },
});

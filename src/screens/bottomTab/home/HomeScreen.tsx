import { Dimensions, ImageBackground, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import RestApi from '../../../Api/RestApi';
import Images from '../../../assets/Images';
import { fp, hp } from '../../../helper/Responsive';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import CustomeButton from '../../../component/CustomeButton';
import { ProductProps } from '../../../helper/interface';
import ProductComponent from '../../../component/ProductComponent';
import usePullDownToRefresh from "../../../utils/usePullDownToRefresh"
import showToast from '../../../utils/showToast';
import { useAppDispatch } from '../../../Redux/reducers/hooks';
import { setuserData } from '../../../Redux/reducers/UserReducer';
const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<ProductProps[]>([]);
  const { refresh, refreshPageHandler } = usePullDownToRefresh()

  useEffect(() => {
    getAllProduct()
    getUserProfile()
  }, [])

  const getAllProduct = async () => {
    try {
      const res = await RestApi({ method: 'GET', endpoint: 'product/allProducts' });
      if (res?.status === 200) {
        setProduct(res.result);
      }
    } catch (error) {
      showToast({ message: "Internal server error", type: "error" })
      console.log('homeSceen error: ', error);
    }
  };

  const getUserProfile = async () => {
    try {
      const res = await RestApi({ method: "GET", endpoint: "user/profile" })
      console.log("response", res)
      if (!res || res.status !== 200) return showToast({ message: "user not found" })
      dispatch(setuserData(res?.result))
    } catch (error) {
      console.log("Catch Error to get user profile data", error)
    }
  }





  return (
    <ProductComponent product={product}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => refreshPageHandler(getAllProduct)}
        />
      }
      listHeaderComponent={
        <>
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
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewProduct}>View all</Text>
            </TouchableOpacity>
          </View>

        </>
      } />
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

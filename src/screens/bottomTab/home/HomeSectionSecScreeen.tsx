import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import Images from '../../../assets/Images';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';
import { ProductProps } from './HomeScreen';
import ProductCard from '../../../component/ProductCard';
import RestApi from '../../../Api/RestApi';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../component/Header';

const { width, height } = Dimensions.get('window');
const HomeSectionSecScreeen = ({ navigation }: any) => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  useFocusEffect(
    useCallback(() => {
      handleProductApi();
    }, []),
  );
  const handleProductApi = async () => {
    const response = await RestApi({
      method: 'GET',
      endpoint: 'products',
    });
    if (response) {
      setProduct(response);
      console.log('response', response);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductProps;
    index: number;
  }) => {
    return (
      <ProductCard
        category=""
        image={item?.image}
        price={item?.price}
        title={item?.title}
        rating={item?.rating}
        description={item?.description}
        id={item?.id}
        index={index}
        onPress={() => {}}
        tag="NewProduct"
      />
    );
  };
  return (
    <>
      <Header showLeftIcon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={Images.bannerSec}
          style={{
            width: '100%',
            height: height / 5,
            justifyContent: 'flex-end',
          }}
          resizeMode="cover"
        >
          <Text style={styles.headerTxt}>Street clothes</Text>
        </ImageBackground>
        {Array.from({ length: 2 }).map(() => {
          return (
            <>
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
                  <Text style={styles.header2}>Sale</Text>
                  <Text style={styles.lable}>Super summer sale</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('NewCollection')}
                >
                  <Text style={styles.viewProduct}>View all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={product}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </>
          );
        })}
      </ScrollView>
    </>
  );
};

export default HomeSectionSecScreeen;
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
  headerTxt: {
    color: Colors.white,
    fontFamily: fonts.ExtraBold,
    fontSize: fp(34),
    marginBottom: 10,
    paddingLeft: 10,
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

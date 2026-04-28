import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../component/Header';
import Images from '../../../assets/Images';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';
import MenSectionComponent from './CategoriesSection/MenSectionComponent';
import WomenSectionComponent from './CategoriesSection/WomenSectionComponent';
import ChildSectionComponent from './CategoriesSection/ChildSectionComponent';
import RestApi from '../../../Api/RestApi';

const section = ['Mens', 'Womens', 'Child'];

const ShopScreen = ({ navigation }: any) => {
  const [sectionNo, setSectionNo] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const categories = sectionNo == 0 ? 'men' : sectionNo == 1 ? 'women' : 'child';
    getProductsHandler(categories)
  }, [sectionNo])



  const getProductsHandler = async (category: string) => {
    try {
      const res = await RestApi({
        method: 'GET',
        endpoint: `product/allProducts?category=${category}`,
      });
      console.log("categories res", res.result);
      setProducts(res.result);
      // return res.result;
    } catch (error) {
      console.log("categories catch error", error);
    }
  }


  return (
    <View style={styles.rootContainer}>
      <Header
        title="Categories"
        showLeftIcon
        showRightIcon
        rightIcon={Images.search}
        rightIconPress={() => navigation.navigate('SearchScreen')}

      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        {section.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.sectionContainer,
                {
                  borderBottomColor:
                    sectionNo == index ? Colors.third : '#f0f0f0',
                  borderBottomWidth: 3,
                  flex: 3,
                  paddingVertical: 10,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => setSectionNo(index)}
            >
              <Text
                style={[
                  styles.sectionTxt,
                  {
                    color:
                      sectionNo == index ? Colors.black : Colors.placeHolder,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {sectionNo == 0 ? (
        <MenSectionComponent data={products} />
      ) : sectionNo == 1 ? (
        <WomenSectionComponent data={products} />
      ) : (
        <ChildSectionComponent data={products} />
      )}
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#f0f0f0',
  },
  sectionContainer: {},
  sectionTxt: {
    color: Colors.black,
    fontFamily: fonts.Regular,
    fontSize: fp(18),
    textAlign: 'center',
  },
});

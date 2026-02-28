import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../../component/Header';
import Images from '../../../assets/Images';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';
import MenSectionComponent from './CategoriesSection/MenSectionComponent';
import WomenSectionComponent from './CategoriesSection/WomenSectionComponent';
import ChildSectionComponent from './CategoriesSection/ChildSectionComponent';

const section = ['Mens', 'Womens', 'Child'];

const ShopScreen = () => {
  const [sectionNo, setSectionNo] = useState(0);
  return (
    <View style={styles.rootContainer}>
      <Header
        title="Categories"
        showLeftIcon
        showRightIcon
        rightIcon={Images.search}
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
          <MenSectionComponent />
        ) : sectionNo == 1 ? (
          <WomenSectionComponent />
        ) : (
          <ChildSectionComponent />
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

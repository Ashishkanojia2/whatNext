import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../../../helper/Colors';
import fonts from '../../../../assets/fonts';
import { fp, hp } from '../../../../helper/Responsive';
import { ProductProps } from '../../../../helper/interface';
import ProductCard from '../../../../component/ProductCard';


 const renderItem = ({item,index,}: {
    item: ProductProps;
    index: number;
  }) => {
    return (
      <ProductCard item={item} index={index}/>
    );
  };


const MenSectionComponent = (data:any) => {
  return (
      <FlatList
        data={data?.data}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: hp(100)}}
        ListHeaderComponent={() => 
          <View style={styles.banner}>
            <Text style={styles.bannerTxt}>SUMMER SALES</Text>
            <Text style={[styles.bannerTxt, { fontSize: fp(13) }]}>
              Up to 15% off
            </Text>
          </View>
        }
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
  );
};

export default MenSectionComponent;

const styles = StyleSheet.create({
  banner: {
    borderRadius: 10,
    backgroundColor: Colors.third,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(100),
    gap: 5,
    marginVertical: 15,
    marginHorizontal:10
  },
  bannerTxt: {
    color: Colors.white,
    fontFamily: fonts.SemiBold,
    fontSize: fp(25),
  },
});

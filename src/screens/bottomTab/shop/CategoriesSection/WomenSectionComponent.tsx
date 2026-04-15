// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const WomenSectionComponent = ({ route }: any) => {
//   const { products } = route?.params ?? [];
//   return (
//     <View>
//       <Text>WomenSectionComponent</Text>
//     </View>
//   );
// };

// export default WomenSectionComponent;

// const styles = StyleSheet.create({});
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


const WomenSectionComponent = (data:any) => {
  return (
      <FlatList
        data={data?.data}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: hp(100)}}
        ListHeaderComponent={() => 
          <View style={styles.banner}>
            <Text style={styles.bannerTxt}>WOMENS SALES</Text>
            <Text style={[styles.bannerTxt, { fontSize: fp(13) }]}>
              Up to 35% off
            </Text>
          </View>
        }
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
  );
};

export default WomenSectionComponent;

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

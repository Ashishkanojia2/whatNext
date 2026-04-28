import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../../../helper/Colors';
import fonts from '../../../../assets/fonts';
import { fp, hp } from '../../../../helper/Responsive';
import ProductComponent from '../../../../component/ProductComponent';

const MenSectionComponent = (data: any) => {
  const listHeader = () => {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerTxt}>SUMMER SALES</Text>
        <Text style={[styles.bannerTxt, { fontSize: fp(13) }]}>
          Up to 15% off
        </Text>
      </View>
    );
  }
  return (
    <ProductComponent product={data?.data}
      listHeaderComponent={
        listHeader()}
        contentContainerStyle={{paddingBottom:100}}

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
    marginHorizontal: 10
  },
  bannerTxt: {
    color: Colors.white,
    fontFamily: fonts.SemiBold,
    fontSize: fp(25),
  },
});

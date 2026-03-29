import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../../../helper/Colors';
import fonts from '../../../../assets/fonts';
import { fp, hp } from '../../../../helper/Responsive';

const MenSectionComponent = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.banner}>
        <Text style={styles.bannerTxt}>SUMMER SALES</Text>
        <Text style={[styles.bannerTxt, { fontSize: fp(13) }]}>
          Up to 15% off
        </Text>
      </View>
    </View>
  );
};

export default MenSectionComponent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal:10
  },
  banner: {
    borderRadius: 10,
    backgroundColor: Colors.third,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(100),
    width: '100%',
    gap:5,
    marginVertical:15
  },
  bannerTxt: {
    color: Colors.white,
    fontFamily: fonts.SemiBold,
    fontSize: fp(25),
  },
});

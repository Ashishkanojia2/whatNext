import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Images from '../../../assets/Images';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp, wp } from '../../../helper/Responsive';
import Header from '../../../component/Header';

const { width, height } = Dimensions.get('window');
const NewCollection = () => {
  return (
    <View style={styles.rootContainer}>
      <ImageBackground
        source={Images.banner3}
        style={{
          width: width,
          height: height / 2.2,
          justifyContent: 'space-between',
        }}
      >
        <Header title="Collection" headerTxt={{color:Colors.white}}  showLeftIcon backIconColor={Colors.white}/>
        <Text style={styles.headerTxt}>New Collection</Text>
      </ImageBackground>
      <View style={{ flexDirection: 'row', flex: 2 }}>
        <View style={{ justifyContent: 'space-between' }}>
          <View style={styles.EmptyBox}>
            <Text style={styles.summerSale}>{`Summer\nSale`}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={{ height: '50%' }}>
            <Image
              source={Images.banner5}
              style={{ height: '100%', width: width / 2 }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={Images.banner4}
            style={{ height: '100%', width: width / 2 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewCollection;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerTxt: {
    color: Colors.white,
    fontFamily: fonts.ExtraBold,
    fontSize: fp(34),
    marginBottom: '10%',
    textAlign: 'right',
    marginRight: '5%',
  },
  EmptyBox: {
    width: width / 2,
    height: '50%',
    justifyContent: 'center',
  },
  summerSale: {
    // textAlign: 'center',
    fontFamily: fonts.ExtraBold,
    fontSize: wp(32),
    color: Colors.third,
    marginLeft: 10,
  },
});

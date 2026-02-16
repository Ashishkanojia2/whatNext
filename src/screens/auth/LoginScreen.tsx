import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../helper/Colors';
import Header from '../../component/Header';
import { fp, hp, wp } from '../../helper/Responsive';
import fonts from '../../assets/fonts';
import CustomeTextInput from '../../component/CustomeTextInput';
import Images from '../../assets/Images';
import CustomeButton from '../../component/CustomeButton';

const LoginScreen = ({navigation}:any) => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <View style={styles.rootContainer}>
      <Header showLeftIcon />
      <Text style={styles.title}>Login</Text>
      <View style={{ gap: 15, marginTop: '25%' }}>
        <CustomeTextInput
          value={mail}
          onChangeText={value => setMail(value)}
          placeholder="Email"
          title="Email"
        />
        <CustomeTextInput
          value={password}
          onChangeText={value => setPassword(value)}
          placeholder="Password"
          title="Password"
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-end',
            gap: 3,
          }}
          onPress={()=>navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.title2}>Forgot you password?</Text>
          <Image source={Images.redRightArrowIcon} style={styles.rightArrow} />
        </TouchableOpacity>
      </View>
      <CustomeButton lable={'LOGIN'} buttonStyle={{ marginTop: '10%' }} onPress={()=>navigation.navigate("SignupScreen")}/>
      <View style={{ alignItems: 'center', marginTop: '35%' }}>
        <Text style={styles.title2}>Or login with social account</Text>
        <View style={{ flexDirection: 'row' }}>
          <SocailIcon image={Images.googleIcon} onPress={() => {}} />
          <SocailIcon image={Images.faceBook} onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const SocailIcon = ({ image, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.socialContainer} activeOpacity={0.7}>
      <Image source={image} style={styles.socailIcon}/>
    </TouchableOpacity>
  );
};

const commonStyle = StyleSheet.create({
 mediumTxt: {
    fontSize: fp(14),
    fontFamily: fonts.Medium,
    color: Colors.black,
  },
});

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: fonts.SemiBold,
    fontSize: fp(34),
    marginTop: '5%',
  },
  title2: {
    ...commonStyle.mediumTxt,
  },
  rightArrow: {
    height: 30,
    width: 30,
  },
  socailIcon: {
    height: 30,
    width: 30,
  },
  socialContainer: {
    borderRadius: 18,
    paddingHorizontal: 30,
    paddingVertical:18,
    shadowOpacity: 0.1,
    backgroundColor: Colors.white,
    marginHorizontal:10,
    marginTop:'5%'
  },
});

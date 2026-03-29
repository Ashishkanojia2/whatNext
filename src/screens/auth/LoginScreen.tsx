import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Colors from '../../helper/Colors';
import Header from '../../component/Header';
import { fp, hp, wp } from '../../helper/Responsive';
import fonts from '../../assets/fonts';
import CustomeTextInput from '../../component/CustomeTextInput';
import Images from '../../assets/Images';
import CustomeButton from '../../component/CustomeButton';
import showToast from '../../utils/showToast';
import RestApi from '../../Api/RestApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localStore from '../../utils/AsynsStorage';
import { useFocusEffect } from '@react-navigation/native';

const LoginScreen = ({ navigation }: any) => {
  const [mail, setMail] = useState<string>('test001@gmail.com');
  const [password, setPassword] = useState<string>('Hello@123');
  const LoginHandler = async () => {
    const request = {
      email: mail,
      password: password,
    };

    try {
      if (!mail)
        return showToast({ message: 'Please enter email', type: 'error' });
      if (!password)
        return showToast({ message: 'Please enter password', type: 'error' });
      const response = await RestApi({
        method: 'POST',
        endpoint: 'login',
        request,
      });
      console.log('Login Response', response);
      if (response.success) {
        showToast({ message: response.message, type: 'success' });
  await localStore({ method: 'set', key: 'token', value: response?.token });
  // read back and log to confirm it was stored
  const saved = await localStore({ method: 'get', key: 'token' });
  console.log('token saved to AsyncStorage:', saved);
        // After storing token, reset to the app main entry. Use 'BottomNav' which exists
        // at the top-level navigator so the reset succeeds.
        navigation.reset({
          index: 0,
          routes: [{ name: 'mainStack' }],
        });
      }
    } catch (error) {
      console.log('Login Catch error', error);
    }
  };
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
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.title2}>Forgot you password?</Text>
          <Image source={Images.redRightArrowIcon} style={styles.rightArrow} />
        </TouchableOpacity>
      </View>
      <CustomeButton
        lable={'LOGIN'}
        buttonStyle={{ marginTop: '10%' }}
        onPress={LoginHandler}
      />
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
    <TouchableOpacity
      onPress={onPress}
      style={styles.socialContainer}
      activeOpacity={0.7}
    >
      <Image source={image} style={styles.socailIcon} />
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
    paddingVertical: 18,
    shadowOpacity: 0.1,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    marginTop: '5%',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../helper/Colors';
import Header from '../../component/Header';
import { fp} from '../../helper/Responsive';
import fonts from '../../assets/fonts';
import CustomeTextInput from '../../component/CustomeTextInput';
import CustomeButton from '../../component/CustomeButton';

const ForgotPasswordScreeen = ({navigation}:any) => {
  const [mail, setMail] = useState<string>('');
  return (
    <View style={styles.rootContainer}>
      <Header showLeftIcon leftIconPress={()=>navigation.goBack()}/>
      <Text style={styles.title}>Forgot password</Text>
      <View style={{ gap: 30, marginTop: '20%' }}>
        <Text style={styles.title2}>
            Please, enter your email address. you will recived otp to create a new password via email.
        </Text>
        <CustomeTextInput
          value={mail}
          onChangeText={value => setMail(value)}
          placeholder="Email"
          title="Email"
        />
      </View>
      <CustomeButton lable={'SEND'} buttonStyle={{ marginTop: '10%' }} onPress={()=>navigation.navigate("BottomNav")}/>
      <View style={{ alignItems: 'center', marginTop: '35%' }}>
      </View>
    </View>
  );
};

export default ForgotPasswordScreeen;
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
    lineHeight:20
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

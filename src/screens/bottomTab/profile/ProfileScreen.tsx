import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fp, hp, wp } from '../../../helper/Responsive'
import Images from '../../../assets/Images'
import fonts from '../../../assets/fonts'

interface OptionProps {
  id: number;
  title: string;
  img: any;
  navigation?: string;
}

const options: OptionProps[] = [
  {
    id: 1,
    title: "My Orders",
    img: Images.orderIcon,
    navigation: "MyOrder"
  },
  {
    id: 3,
    title: "Payment Method",
    img: Images.paymentIcon,
    navigation: "Payments"
  }, {
    id: 4,
    title: "Notification",
    img: Images.notificationIcon,
    navigation: "Notofication"
  }, {
    id: 5,
    title: "Settings",
    img: Images.settingsIcon,
    navigation: "Setting"
  },
  {
    id: 7,
    title: "About Us",
    img: Images.infoIcon,
    navigation: "AboutUs"
  },
  {
    id: 8,
    title: "Logout",
    img: Images.logoutIcon,
    navigation: "Logout"
  }, {
    id: 9,
    title: "Delete Account",
    img: Images.deleteIcon,
    navigation: "DeleteAccount"
  }, {
    id: 10,
    title: "Feedback",
    img: Images.feedbackIcon,
    navigation: "Feedback"
  }, {
    id: 15,
    title: "Terms of Service",
    img: Images.infoIcon,
    navigation: "TermAndService"
  }, {
    id: 16,
    title: "Contact Us",
    img: Images.contactIcon,
    navigation: "ContactUs"
  }, {
    id: 17,
    title: "FAQ",
    img: Images.faqIcon,
    navigation: "FAQ"
  },
]

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View style={styles.rootContainer}>
      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        {options.map((option) => (
          <TouchableOpacity style={styles.profileItem} key={option.id} onPress={() => navigation.navigate(option.navigation)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={option.img} style={styles.optionImg} />
              <Text style={styles.title}>{option.title}</Text>
            </View>
            <Image source={Images.backIcon} style={styles.arrowIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  profileItem: {
    borderRadius: 10,
    elevation: 10,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 18, paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: '1%',

  }, optionImg: {
    width: wp(20),
    height: hp(20)
  }, arrowIcon: {
    width: wp(18),
    height: hp(18),
    transform: [{ rotate: '180deg' }],
  },
  title: {
    fontSize: fp(17),
    fontFamily: fonts.SemiBold,
    marginLeft: 10,
  }
})
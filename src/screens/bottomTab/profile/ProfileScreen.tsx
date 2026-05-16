import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fp, hp, wp } from '../../../helper/Responsive'
import Images from '../../../assets/Images'
import fonts from '../../../assets/fonts'
import Colors from '../../../helper/Colors'
import RestApi from '../../../Api/RestApi'
import localStore from '../../../utils/AsynsStorage'
import showToast from '../../../utils/showToast'
import { UserProfileProps } from '../../../helper/interface'
import { useAppDispatch, useAppSelector } from '../../../Redux/reducers/hooks'
import { setuserData } from '../../../Redux/reducers/UserReducer'

interface OptionProps {
  id: number;
  title: string;
  img: any;
  navigation?: string;
}
const options: OptionProps[] = [
  {
    id: 1,
    title: "My Profile",
    img: Images.orderIcon,
    navigation: "MyProfile"
  },
  {
    id: 2,
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
  }, {
    id: 8,
    title: "Logout",
    img: Images.logoutIcon,
    navigation: "Logout"
  },
]

const ProfileScreen = ({ navigation }: any) => {
  const user = useAppSelector((state) => state.user.userData)
  console.log("user", user);
  
  const onPressHandler = async (value: string | undefined) => {
    if (value == "Logout") {
      const result = await localStore({ method: "remove", key: "token" })
      console.log("result", result)
      navigation.navigate("AuthStack")
    } else {
      navigation.navigate(value)
    }
  }

  return (
    <View style={styles.rootContainer}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        <View style={styles.headerCard}>
          <Image source={{ uri: user?.avatar?.url }} style={styles.avatar} resizeMode='contain' />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{0}</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{10}</Text>
                <Text style={styles.statLabel}>Wishlist</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statVal}>{12}</Text>
                <Text style={styles.statLabel}>Vouchers</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfileScreen')}>
            <Text style={styles.editTxt}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 12 }} />

        {options.map((option) => (
          <TouchableOpacity style={styles.profileItem} key={option.id} onPress={() => onPressHandler(option?.navigation)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
    backgroundColor: Colors.primary2,
  },
  headerCard: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 40,
  },
  name: { fontFamily: fonts.SemiBold, fontSize: fp(18), color: Colors.black },
  email: { fontFamily: fonts.Regular, color: Colors.placeHolder, marginTop: 4 },
  statsRow: { flexDirection: 'row', marginTop: 8 },
  statItem: { marginRight: 18, alignItems: 'center' },
  statVal: { fontFamily: fonts.SemiBold, fontSize: fp(16) },
  statLabel: { fontFamily: fonts.Regular, color: Colors.placeHolder, fontSize: fp(12) },
  editBtn: { backgroundColor: Colors.third, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  editTxt: { color: Colors.white, fontFamily: fonts.Medium },
  profileItem: {
    borderRadius: 10,
    elevation: 6,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginHorizontal: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginVertical: 8,
  },
  optionImg: {
    width: wp(20),
    height: hp(20),
  },
  arrowIcon: {
    width: wp(18),
    height: hp(18),
    transform: [{ rotate: '180deg' }],
  },
  title: {
    fontSize: fp(17),
    fontFamily: fonts.SemiBold,
    marginLeft: 12,
    color: Colors.black,
  },
});
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp, hp, wp } from '../../../helper/Responsive';
import Images from '../../../assets/Images';
import { useAppSelector } from '../../../Redux/reducers/hooks';
import ProfileField from '../../../component/ProfileField';
import { UserProfileProps } from '../../../helper/interface';

const MyProfileScreen = ({ navigation }: any) => {
    const { userData } = useAppSelector((state) => state.user);
    console.log("useData", userData);

  const confirmDelete = () => {
    Alert.alert('Delete account', 'Are you sure you want to delete your account? This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Deleted', 'Account deleted (demo)') },
    ]);
  };

  const confirmDeactivate = () => {
    Alert.alert('Deactivate account', 'Are you sure you want to deactivate your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Deactivate', onPress: () => Alert.alert('Deactivated', 'Account deactivated (demo)') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCard}>
        <Image source={Images.activeProfile} style={styles.avatar} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
          <Text style={[styles.email, { marginTop: 6 }]}>{userData?.phone}</Text>
        </View>
        <TouchableOpacity style={styles.editSmall} onPress={() => navigation.navigate('EditProfileScreen')}>
          <Text style={styles.editSmallTxt}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 16 }}>
        <ProfileField label="Address" value={userData?.address} />
        <ProfileField label="Landmark" value={userData?.landMark} />
        <ProfileField label="Pin Code" value={userData?.pinCode} />
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={[styles.dangerBtn]} onPress={confirmDeactivate}>
          <Text style={styles.dangerTxt}>Deactivate Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dangerBtn, { backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.third }]} onPress={confirmDelete}>
          <Text style={[styles.dangerTxt, { color: Colors.third }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary2, padding: 12 },
  topCard: { backgroundColor: Colors.white, padding: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  avatar: { width: 84, height: 84, borderRadius: 42 },
  name: { fontFamily: fonts.SemiBold, fontSize: fp(18), color: Colors.black },
  email: { fontFamily: fonts.Regular, color: Colors.placeHolder, marginTop: 4 },
  editSmall: { backgroundColor: Colors.third, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  editSmallTxt: { color: Colors.white, fontFamily: fonts.Medium },
  form: { marginTop: 16 },
  label: { fontFamily: fonts.Medium, marginTop: 12 },
  input: { backgroundColor: Colors.white, padding: 12, borderRadius: 8, marginTop: 8 },
  saveBtn: { marginTop: 16, backgroundColor: Colors.third, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  saveTxt: { color: Colors.white, fontFamily: fonts.SemiBold },
  bottomActions: { marginTop: 24, gap: 12 },
  dangerBtn: { backgroundColor: Colors.third, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  dangerTxt: { color: Colors.white, fontFamily: fonts.SemiBold },
});
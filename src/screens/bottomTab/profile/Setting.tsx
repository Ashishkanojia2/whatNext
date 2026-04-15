import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';

const Setting = ({ navigation }: any) => {
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <TouchableOpacity style={styles.rowBtn} onPress={() => navigation.navigate('ContactUs')}>
        <Text style={styles.label}>Contact Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rowBtn} onPress={() => navigation.navigate('TermAndService')}>
        <Text style={styles.label}>Terms & Service</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8, color: Colors.black },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, backgroundColor: Colors.white, paddingHorizontal: 12, borderRadius: 8, marginVertical: 8 },
  label: { fontFamily: fonts.Medium },
  rowBtn: { backgroundColor: Colors.white, padding: 12, borderRadius: 8, marginVertical: 8 },
});
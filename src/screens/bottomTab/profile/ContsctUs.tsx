import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';

const ContsctUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const send = () => {
    Alert.alert('Message sent', 'We will get back to you soon');
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="you@domain.com" />
      <Text style={styles.label}>Message</Text>
      <TextInput value={message} onChangeText={setMessage} style={[styles.input, { minHeight: 120 }]} multiline placeholder="How can we help?" />
      <TouchableOpacity style={styles.sendBtn} onPress={send}>
        <Text style={styles.sendTxt}>Send</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sub}>Support</Text>
        <Text style={styles.paragraph}>help@whatnext.example</Text>
        <Text style={styles.paragraph}>+1 234 567 890</Text>
      </View>
    </View>
  );
};

export default ContsctUs;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8 },
  label: { fontFamily: fonts.Medium, marginTop: 12 },
  input: { backgroundColor: Colors.white, borderRadius: 8, padding: 12, marginTop: 8 },
  sendBtn: { backgroundColor: Colors.third, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  sendTxt: { color: Colors.white, fontFamily: fonts.Medium },
  sub: { fontFamily: fonts.Medium, marginTop: 8 },
  paragraph: { color: Colors.placeHolder, fontFamily: fonts.Regular, marginTop: 6 },
});
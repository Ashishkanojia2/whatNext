import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';

const TermAndService = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.header}>Terms of Service</Text>
      <Text style={styles.paragraph}>
        These terms govern your use of the WhatNext application. By using the app,
        you agree to the following terms and conditions. Please read them
        carefully.
      </Text>

      <Text style={styles.sub}>User Conduct</Text>
      <Text style={styles.paragraph}>Users must not abuse or misuse the app...</Text>

      <Text style={styles.sub}>Limitation of Liability</Text>
      <Text style={styles.paragraph}>WhatNext is not liable for indirect damages...</Text>
    </ScrollView>
  );
};

export default TermAndService;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8, color: Colors.black },
  sub: { fontFamily: fonts.Medium, marginTop: 8 },
  paragraph: { fontFamily: fonts.Regular, color: Colors.placeHolder, lineHeight: 20, marginBottom: 12 },
});
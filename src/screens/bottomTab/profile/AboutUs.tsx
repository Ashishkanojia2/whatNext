import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';

const AboutUs = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.header}>About WhatNext</Text>
      <Text style={styles.paragraph}>
        WhatNext is a modern shopping app focused on curated fashion and mindful
        shopping. We bring the newest collections from independent brands and
        help you discover styles you'll love.
      </Text>

      <Text style={styles.sub}>Our Mission</Text>
      <Text style={styles.paragraph}>
        To make shopping simple, delightful and sustainable.
      </Text>

      <Text style={styles.sub}>Version</Text>
      <Text style={styles.paragraph}>1.0.0</Text>
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8, color: Colors.black },
  paragraph: { fontFamily: fonts.Regular, color: Colors.placeHolder, lineHeight: 20, marginBottom: 12 },
  sub: { fontFamily: fonts.Medium, marginTop: 8, marginBottom: 4 },
});
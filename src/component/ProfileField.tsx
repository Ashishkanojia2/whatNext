import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../helper/Colors';
import fonts from '../assets/fonts';
import { fp } from '../helper/Responsive';

type Props = {
  label: string;
  value?: string | string[];
};

const ProfileField = ({ label, value }: Props) => {
  const renderValue = () => {
    if (Array.isArray(value)) return (value as string[]).join(', ');
    return value ?? '-';
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{renderValue()}</Text>
    </View>
  );
};

export default ProfileField;

const styles = StyleSheet.create({
  row: { backgroundColor: Colors.white, padding: 12, borderRadius: 10, marginVertical: 6 },
  label: { fontFamily: fonts.Medium, color: Colors.placeHolder, marginBottom: 6 },
  value: { fontFamily: fonts.Regular, color: Colors.black },
});

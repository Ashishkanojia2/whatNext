import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const submit = () => {
    // placeholder for submit action
    Alert.alert('Thank you', 'Your feedback has been submitted');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback</Text>
      <Text style={styles.label}>Rate your experience</Text>
      <View style={styles.ratingRow}>
        {[1,2,3,4,5].map(n => (
          <TouchableOpacity key={n} onPress={() => setRating(n)} style={[styles.star, rating>=n?{backgroundColor:Colors.third}:{backgroundColor:'#eee'}]}>
            <Text style={{color: rating>=n?Colors.white:Colors.placeHolder}}>{'★'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Message</Text>
      <TextInput value={message} onChangeText={setMessage} multiline style={styles.input} placeholder="Tell us what you think" />

      <TouchableOpacity style={styles.submitBtn} onPress={submit}>
        <Text style={styles.submitTxt}>Send Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8 },
  label: { fontFamily: fonts.Medium, marginTop: 12 },
  ratingRow: { flexDirection: 'row', marginTop: 8 },
  star: { padding: 10, marginRight: 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  input: { backgroundColor: Colors.white, minHeight: 120, borderRadius: 8, padding: 12, marginTop: 8, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: Colors.third, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  submitTxt: { color: Colors.white, fontFamily: fonts.Medium },
});
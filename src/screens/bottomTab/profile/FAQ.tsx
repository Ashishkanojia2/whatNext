import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';

type QA = { id: string; q: string; a: string };

const data: QA[] = [
  { id: '1', q: 'How do I return an item?', a: 'You can request a return from the order details within 30 days.' },
  { id: '2', q: 'What payment methods are supported?', a: 'We support cards, UPI and mobile wallets.' },
  { id: '3', q: 'How long does shipping take?', a: 'Shipping typically takes 3-7 business days.' },
];

const FAQ = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Frequently Asked Questions</Text>
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => setOpen(open === item.id ? null : item.id)}>
            <Text style={styles.q}>{item.q}</Text>
            {open === item.id && <Text style={styles.a}>{item.a}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(20), marginVertical: 8 },
  card: { backgroundColor: Colors.white, padding: 12, borderRadius: 8, marginVertical: 8 },
  q: { fontFamily: fonts.Medium },
  a: { marginTop: 8, color: Colors.placeHolder, fontFamily: fonts.Regular },
});
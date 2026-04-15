import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';

type Card = { id: string; brand: string; last4: string; exp: string };

const sample: Card[] = [
  { id: '1', brand: 'Visa', last4: '4242', exp: '12/24' },
  { id: '2', brand: 'Mastercard', last4: '8888', exp: '08/26' },
];

const Payments = ({ navigation }: any) => {
  const [cards, setCards] = useState<Card[]>(sample);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Methods</Text>

      <FlatList
        data={cards}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardBrand}>{item.brand}</Text>
              <Text style={styles.cardNum}>**** **** **** {item.last4}</Text>
            </View>
            <Text style={styles.exp}>{item.exp}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Payments') }>
        <Text style={styles.addTxt}>Add New Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8, color: Colors.black },
  card: { backgroundColor: Colors.white, padding: 12, borderRadius: 10, marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  cardBrand: { fontFamily: fonts.Medium },
  cardNum: { fontFamily: fonts.Regular, color: Colors.placeHolder, marginTop: 4 },
  exp: { fontFamily: fonts.Medium, color: Colors.placeHolder },
  addBtn: { marginTop: 12, backgroundColor: Colors.third, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  addTxt: { color: Colors.white, fontFamily: fonts.Medium },
});
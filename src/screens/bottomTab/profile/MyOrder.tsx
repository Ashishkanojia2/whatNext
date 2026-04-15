import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp, hp, wp } from '../../../helper/Responsive';

type Order = {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled';
};

const sample: Order[] = [
  { id: 'ORD1234', date: '2026-03-10', total: 79.99, status: 'Delivered' },
  { id: 'ORD1235', date: '2026-03-25', total: 45.0, status: 'Processing' },
  { id: 'ORD1236', date: '2026-04-02', total: 120.5, status: 'Cancelled' },
];

const MyOrder = ({ navigation }: any) => {
  const [orders] = useState<Order[]>(sample);

  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.orderId}>{item.id}</Text>
        <Text style={styles.muted}>{item.date}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.total}>${item.total.toFixed(2)}</Text>
        <Text style={[styles.status, item.status === 'Delivered' ? { color: 'green' } : item.status === 'Cancelled' ? { color: 'red' } : { color: Colors.placeHolder }]}>{item.status}</Text>
        <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('HomeSectionSecScreeen')}>
          <Text style={styles.viewTxt}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <FlatList data={orders} keyExtractor={i => i.id} renderItem={renderItem} />
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8, color: Colors.black },
  card: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.white, padding: 12, borderRadius: 10, marginVertical: 8, elevation: 2 },
  orderId: { fontFamily: fonts.Medium, fontSize: fp(16) },
  muted: { fontFamily: fonts.Regular, color: Colors.placeHolder, marginTop: 4 },
  total: { fontFamily: fonts.SemiBold, fontSize: fp(16), color: Colors.black },
  status: { fontFamily: fonts.Medium, marginTop: 4 },
  viewBtn: { marginTop: 8, backgroundColor: Colors.third, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  viewTxt: { color: Colors.white, fontFamily: fonts.Medium },
});
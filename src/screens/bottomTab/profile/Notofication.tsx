import React, { useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';

type Noti = { id: string; title: string; body: string; read?: boolean };

const sample: Noti[] = [
  { id: '1', title: 'Order Delivered', body: 'Your order ORD1234 has been delivered.' },
  { id: '2', title: 'New Collection', body: 'Check out the new summer collection.' },
  { id: '3', title: 'Offer', body: 'Flat 20% off on selected items.' },
];

const Notofication = () => {
  const [notis, setNotis] = useState<Noti[]>(sample);
  const [pushEnabled, setPushEnabled] = useState(true);

  const togglePush = () => setPushEnabled(v => !v);

  const markRead = (id: string) => setNotis(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Push Notifications</Text>
        <Switch value={pushEnabled} onValueChange={togglePush} />
      </View>

      <FlatList
        data={notis}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, item.read ? { opacity: 0.6 } : {}]} onPress={() => markRead(item.id)}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Notofication;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: Colors.primary2 },
  header: { fontFamily: fonts.SemiBold, fontSize: fp(22), marginVertical: 8, color: Colors.black },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  switchLabel: { fontFamily: fonts.Medium },
  card: { backgroundColor: Colors.white, padding: 12, borderRadius: 10, marginVertical: 8, elevation: 2 },
  title: { fontFamily: fonts.Medium },
  body: { fontFamily: fonts.Regular, color: Colors.placeHolder, marginTop: 4 },
});
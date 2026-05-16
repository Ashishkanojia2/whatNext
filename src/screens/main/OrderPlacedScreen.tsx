import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../../helper/Colors';
import fonts from '../../assets/fonts';
import { fp } from '../../helper/Responsive';
import Images from '../../assets/Images';

const OrderPlacedScreen = ({ navigation, route }: any) => {
  const orderId = route?.params?.orderId || `#${Math.floor(Math.random() * 900000) + 100000}`;
  const total = route?.params?.total || 0;
  const eta = route?.params?.eta || '2-4 business days';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={Images.greenCheck} style={styles.icon} />
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>Thank you for your purchase. Your order has been received and is being processed.</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Order ID</Text>
          <Text style={styles.summaryValue}>{orderId}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>₹{Number(total).toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Estimated delivery</Text>
          <Text style={styles.summaryValue}>{eta}</Text>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.replace('MyOrder', { orderId })}>
          <Text style={styles.primaryTxt}>View Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('BottomNav')}>
          <Text style={styles.secondaryTxt}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary2, justifyContent: 'center', alignItems: 'center' },
  card: { width: '90%', backgroundColor: Colors.white, borderRadius: 12, padding: 20, alignItems: 'center', elevation: 6 },
  icon: { width: 72, height: 72, marginBottom: 12 },
  title: { fontFamily: fonts.SemiBold, fontSize: fp(20), color: Colors.black, marginBottom: 6 },
  subtitle: { fontFamily: fonts.Regular, color: Colors.placeHolder, textAlign: 'center', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 6, borderBottomWidth: 1, borderColor: '#f2f2f2' },
  summaryLabel: { color: Colors.placeHolder, fontFamily: fonts.Regular },
  summaryValue: { color: Colors.black, fontFamily: fonts.Medium },
  primaryBtn: { marginTop: 16, backgroundColor: Colors.third, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, width: '100%', alignItems: 'center' },
  primaryTxt: { color: Colors.white, fontFamily: fonts.SemiBold },
  secondaryBtn: { marginTop: 10, borderWidth: 1, borderColor: Colors.third, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, width: '100%', alignItems: 'center' },
  secondaryTxt: { color: Colors.third, fontFamily: fonts.SemiBold },
});

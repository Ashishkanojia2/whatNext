import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp, hp, wp } from '../../../helper/Responsive';

type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  img?: any;
};

const initialData: CartItem[] = [
  {
    id: '1',
    title: 'Casual T‑shirt',
    price: 24.99,
    qty: 1,
    img: require('../../../assets/Images/productBoy.png'),
  },
  {
    id: '2',
    title: 'Denim Jacket',
    price: 79.0,
    qty: 2,
    img: require('../../../assets/Images/productGirl.png'),
  },
];

const BagScreen = ({ navigation }: any) => {
  const [cart, setCart] = useState<CartItem[]>(initialData);
  const [coupon, setCoupon] = useState('');

  const updateQty = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(i => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)),
    );
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const shipping = subtotal > 100 ? 0 : 8.99;
  const discount = coupon ? 10 : 0; // simple fixed discount for demo
  const total = useMemo(() => Math.max(0, subtotal + shipping - discount), [subtotal, shipping, discount]);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemRow}>
      <Image source={item.img} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
        <View style={styles.rowBetween}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
              <Text style={styles.qtyTxt}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{item.qty}</Text>
            <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
              <Text style={styles.qtyTxt}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.removeTxt}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Bag</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySub}>Add items and they will appear here.</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('BottomNav')}>
            <Text style={styles.shopBtnTxt}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={i => i.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={styles.voucherRow}>
            <TextInput
              placeholder="Enter coupon code"
              placeholderTextColor={Colors.placeHolder}
              style={styles.couponInput}
              value={coupon}
              onChangeText={setCoupon}
            />
            <TouchableOpacity style={styles.applyBtn} onPress={() => {}}>
              <Text style={styles.applyTxt}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Text>
            </View>
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={styles.summaryValue}>-${discount.toFixed(2)}</Text>
              </View>
            )}
            <View style={[styles.summaryRow, { marginTop: 8 }]}> 
              <Text style={[styles.summaryLabel, { fontFamily: fonts.SemiBold }]}>Total</Text>
              <Text style={[styles.summaryValue, { fontFamily: fonts.SemiBold }]}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout') }>
              <Text style={styles.checkoutTxt}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default BagScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary2,
    padding: 12,
  },
  header: {
    fontSize: fp(22),
    fontFamily: fonts.SemiBold,
    color: Colors.black,
    marginVertical: 8,
  },
  itemRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: fp(16),
    color: Colors.black,
  },
  itemPrice: {
    fontFamily: fonts.Medium,
    fontSize: fp(14),
    color: Colors.third,
    marginVertical: 6,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyTxt: {
    fontSize: fp(18),
    fontFamily: fonts.Medium,
  },
  qtyValue: {
    minWidth: 22,
    textAlign: 'center',
    fontFamily: fonts.Medium,
  },
  removeTxt: {
    color: Colors.placeHolder,
    fontFamily: fonts.Medium,
  },
  voucherRow: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    fontFamily: fonts.Regular,
  },
  applyBtn: {
    marginLeft: 8,
    backgroundColor: Colors.third,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyTxt: {
    color: Colors.white,
    fontFamily: fonts.Medium,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    color: Colors.placeHolder,
    fontFamily: fonts.Regular,
  },
  summaryValue: {
    color: Colors.black,
    fontFamily: fonts.Medium,
  },
  checkoutBtn: {
    marginTop: 12,
    backgroundColor: Colors.third,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutTxt: {
    color: Colors.white,
    fontFamily: fonts.SemiBold,
    fontSize: fp(16),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: fp(20),
    fontFamily: fonts.SemiBold,
    color: Colors.black,
    marginBottom: 8,
  },
  emptySub: {
    color: Colors.placeHolder,
    fontFamily: fonts.Regular,
    marginBottom: 16,
  },
  shopBtn: {
    backgroundColor: Colors.third,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopBtnTxt: {
    color: Colors.white,
    fontFamily: fonts.Medium,
  },
});

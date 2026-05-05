import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp } from '../../../helper/Responsive';
import { useAppDispatch, useAppSelector } from '../../../Redux/reducers/hooks';
import { ProductProps } from '../../../helper/interface';
import Images from '../../../assets/Images';
import { addToBag, decreaseQty, removeFromBag } from '../../../Redux/reducers/ProductReducer';

type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  img?: any;
};

const BagScreen = ({ navigation }: any) => {
  const bagItem = useAppSelector(state => state.product.bag)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState('');

  const dispatch = useAppDispatch()

  const subtotal = useMemo(() => bagItem.reduce((s, i) => s + i.price * i.qty, 0), [bagItem]);
  const shipping = subtotal > 100 ? 0 : 8.99;
  const discount = coupon ? 10 : 0;
  const total = useMemo(() => Math.max(0, subtotal + shipping - discount), [subtotal, shipping, discount]);

  const renderItem = ({ item }: { item: ProductProps }) => {
    return (
      <View style={styles.itemRow}>
        <Image source={item?.imageUrl ? { uri: item?.imageUrl?.url } : Images.productGirl} style={styles.itemImage} resizeMode="contain" />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item?.productName}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={[styles.itemPrice, { fontSize: fp(13) }]}>Unit: ₹{Number(item?.price || 0).toFixed(2)}</Text>
              <Text style={[styles.itemPrice, { fontSize: fp(12), color: Colors.placeHolder }]}>Total: ₹{(Number(item?.price || 0) * (item?.qty || 1)).toFixed(2)}</Text>
            </View>
            <Text style={[styles.itemPrice, { fontSize: fp(14), fontFamily: fonts.SemiBold }]}>Qty: {item?.qty || 1}</Text>
          </View>
          <View style={styles.rowBetween}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => dispatch(decreaseQty(item._id ?? item.id))} style={styles.qtyBtn}>
                <Text style={styles.qtyTxt}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item?.qty}</Text>
              <TouchableOpacity onPress={() => dispatch(addToBag(item))} style={styles.qtyBtn}>
                <Text style={styles.qtyTxt}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => dispatch(removeFromBag(item._id ?? item.id))}>
              <Text style={styles.removeTxt}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Bag</Text>

      {bagItem.length === 0 ? (
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
            data={bagItem}
            keyExtractor={(_, index) => index.toString()}
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
            <TouchableOpacity style={styles.applyBtn} onPress={() => { }}>
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

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout')}>
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
    borderRadius: 10,
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
    elevation:10

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
    elevation:10

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

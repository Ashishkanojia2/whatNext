import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../Redux/reducers/hooks';
import Images from '../../assets/Images';
import Colors from '../../helper/Colors';
import fonts from '../../assets/fonts';
import { fp } from '../../helper/Responsive';
import CustomerHeader from '../../component/headeComponent/CustomerHeader';
import RestApi from '../../Api/RestApi';
import { clearBag } from '../../Redux/reducers/ProductReducer';
import LoaderModal from '../../component/modal/LoaderModal';
import OrderItem from '../../component/orderItem/OrderItem';

const CheckoutScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch()
  const bag = useAppSelector((s: any) => s.product.bag || []);

  const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'cod'>('card');

  const subtotal = useMemo(() => bag.reduce((s: number, i: any) => s + (Number(i.price || 0) * (i.qty || 1)), 0), [bag]);
  const shipping = subtotal > 100 ? 0 : 6.99;
  const discount = 0; // coupon flow can set this
  const total = Math.max(0, subtotal + shipping - discount);
  const [loadingModal, setLoadingModal] = useState(false)

  const orderPlacedHandler = async () => {
    console.log("bag", bag)
    if (loadingModal) return;
    setLoadingModal(true)
    try {
      const sellerId: string[] = []
      const productId: string[] = []
      const paymentId: string = '6a343c102919e9e32520ec76'

      bag.forEach((item: any) => {
        sellerId.push(item.sellerId)
        productId.push(item._id)
      })
      console.table("sellerId", sellerId, "productId", productId)
      const data = {
        sellerId,
        productId,
        paymentId
      }

      const response = await RestApi({
        method: "POST",
        endpoint: "order/placeOrder",
        request: data
      })
      if (!response?.success) {
        return;
      }
      dispatch(clearBag())
      navigation.navigate('OrderPlacedScreen')

    } catch (error) {
      console.log("Order Place Error", error)
    } finally {
      setLoadingModal(false)
    }
  }

  // const renderItem = ({ item }: any) => (
  //   <View style={styles.itemRow}>
  //     <Image source={item?.imageUrl ? { uri: item.imageUrl.url } : Images.productGirl} style={styles.itemImage} resizeMode="contain" />
  //     <View style={{ flex: 1, marginLeft: 12 }}>
  //       <Text style={styles.itemTitle} numberOfLines={1}>{item?.productName || item?.title}</Text>
  //       <Text style={styles.itemDesc} numberOfLines={2}>{(item as any)?.description || ''}</Text>
  //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
  //         <Text style={styles.itemPrice}>₹{Number(item.price || 0).toFixed(2)}</Text>
  //         <Text style={styles.itemPrice}>x {item.qty || 1}</Text>
  //       </View>
  //     </View>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <CustomerHeader title='Checkout' backHandler={true} />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.addressName}>John Doe</Text>
              <Text style={styles.addressText}>123, Example Street, City, Country - 123456</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AddressEdit')}>
              <Text style={styles.editTxt}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <FlatList
            data={bag}
            keyExtractor={(it, i) => (it._id ?? it.id ?? i).toString()}
            renderItem={({ item }) => <OrderItem item={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.payRow}>
            <TouchableOpacity style={[styles.payOption, selectedPayment === 'card' && styles.payOptionActive]} onPress={() => setSelectedPayment('card')}>
              <Image source={Images.card} style={styles.payIcon} />
              <Text style={styles.payTxt}>Credit/Debit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.payOption, selectedPayment === 'paypal' && styles.payOptionActive]} onPress={() => setSelectedPayment('paypal')}>
              <Image source={Images.paypal} style={styles.payIcon} />
              <Text style={styles.payTxt}>PayPal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.payOption, selectedPayment === 'cod' && styles.payOptionActive]} onPress={() => setSelectedPayment('cod')}>
              <Image source={Images.money} style={styles.payIcon} />
              <Text style={styles.payTxt}>Cash on Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Shipping</Text><Text style={styles.summaryValue}>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</Text></View>
          {discount > 0 && <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Discount</Text><Text style={styles.summaryValue}>-₹{discount.toFixed(2)}</Text></View>}
          <View style={[styles.summaryRow, { marginTop: 8 }]}><Text style={[styles.summaryLabel, { fontFamily: fonts.SemiBold }]}>Total</Text><Text style={[styles.summaryValue, { fontFamily: fonts.SemiBold }]}>₹{total.toFixed(2)}</Text></View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={{ fontFamily: fonts.Medium }}>Total</Text>
          <Text style={{ fontFamily: fonts.SemiBold, fontSize: fp(18) }}>₹{total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.placeOrderBtn} onPress={orderPlacedHandler} disabled={bag.length === 0}>
          <Text style={styles.placeOrderTxt}>{bag.length === 0 ? 'No items' : 'Place Order'}</Text>
        </TouchableOpacity>
      </View>

      {
        loadingModal &&
        <LoaderModal onVisible={loadingModal} onHide={() => setLoadingModal(false)} />
      }
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary2 },
  sectionCard: { backgroundColor: Colors.white, margin: 12, padding: 12, borderRadius: 10, elevation: 4 },
  sectionTitle: { fontFamily: fonts.Medium, marginBottom: 8 },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  addressName: { fontFamily: fonts.SemiBold },
  addressText: { color: Colors.placeHolder, marginTop: 6, fontFamily: fonts.Regular },
  editTxt: { color: Colors.third, fontFamily: fonts.Medium },
  // itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  // itemImage: { width: 70, height: 70, borderRadius: 8 },
  // itemTitle: { fontFamily: fonts.Medium },
  // itemDesc: { color: Colors.placeHolder, fontFamily: fonts.Regular, marginTop: 4, fontSize: fp(12) },
  // itemPrice: { fontFamily: fonts.Medium, color: Colors.black },
  payRow: { flexDirection: 'row', justifyContent: 'space-between' },
  payOption: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8, marginHorizontal: 6, backgroundColor: '#fafafa', },
  payOptionActive: { borderWidth: 1, borderColor: Colors.third, backgroundColor: '#fff' },
  payIcon: { width: 28, height: 18, marginBottom: 6 },
  payTxt: { fontFamily: fonts.Medium, fontSize: fp(12), textAlign: "center" },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  summaryLabel: { color: Colors.placeHolder, fontFamily: fonts.Regular },
  summaryValue: { color: Colors.black, fontFamily: fonts.Medium },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderTopWidth: 1, borderColor: '#eee', backgroundColor: Colors.primary2 },
  placeOrderBtn: { backgroundColor: Colors.third, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
  placeOrderTxt: { color: Colors.white, fontFamily: fonts.SemiBold },
});

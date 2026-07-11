import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp, hp, wp } from '../../../helper/Responsive';
import RestApi from '../../../Api/RestApi';
import LoaderModal from '../../../component/modal/LoaderModal';
import { useFocusEffect } from '@react-navigation/native';
import OrderItem from '../../../component/orderItem/OrderItem';
import { OrderListProps } from '../../../helper/interface';
import CustomerHeader from '../../../component/headeComponent/CustomerHeader';

const MyOrder = ({ navigation }: any) => {
  const [orders, setOrders] = useState<OrderListProps | []>([]);
  const [productItem, setProductItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyorderHandler = async () => {
    setLoading(true);
    const id = '6a3436d6ed5aba6f100911c3';
    try {
      const response = await RestApi({
        method: 'GET',
        endpoint: `order/getMyOrders?userid=${id}&type=USER`,
      });
      if (!response?.success) {
        console.log("something wents wrong")
      }
      setOrders(response?.result);
    } catch (error) {
      console.log('Get My Order Error', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMyorderHandler();
    }, []),
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>My Orders</Text> */}
      <CustomerHeader
      title='My Order'
      backHandler
      />
      <FlatList
        data={orders}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <OrderItem item={item} />}
      />
      {loading && <LoaderModal onVisible={loading} />}
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: { flex: 1,  backgroundColor: Colors.primary2 },
  header: {
    fontFamily: fonts.SemiBold,
    fontSize: fp(22),
    marginVertical: 8,
    color: Colors.black,
    paddingHorizontal:12
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  orderId: { fontFamily: fonts.Medium, fontSize: fp(16) },
  muted: { fontFamily: fonts.Regular, color: Colors.placeHolder, marginTop: 4 },
  total: { fontFamily: fonts.SemiBold, fontSize: fp(16), color: Colors.black },
  status: { fontFamily: fonts.Medium, marginTop: 4 },
  viewBtn: {
    marginTop: 8,
    backgroundColor: Colors.third,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewTxt: { color: Colors.white, fontFamily: fonts.Medium },
});

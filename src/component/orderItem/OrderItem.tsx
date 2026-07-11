import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import fonts from '../../assets/fonts';
import Colors from '../../helper/Colors';
import Images from '../../assets/Images';
import { fp } from '../../helper/Responsive';
import { OrderListProps } from '../../helper/interface';

const OrderItem = ({ item }: { item: OrderListProps }) => {




  return (
    <View
      style={{
        backgroundColor: Colors.white,
        marginBottom: 10,
        elevation: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        paddingVertical:10,
        
      }}
    >
      <Text style={styles.textStyle}>Order id: <Text style={{color:Colors.gray}}>{item?._id}</Text></Text>
      <Text style={styles.textStyle}>Order placed: <Text style={{color:Colors.gray}}>{item?.createdAt}</Text></Text>
      {item?.productId?.map(item => {
        return (
          <View style={styles.itemRow}>
            <Image
              source={
                item?.imageUrl.url
                  ? { uri: item?.imageUrl?.url }
                  : Images.productGirl
              }
              style={styles.itemImage}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item?.productName || ''}
              </Text>
              <Text style={styles.itemDesc} numberOfLines={2}>
                {item?.description || ''}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 8,
                }}
              >
                <Text style={styles.itemPrice}>
                  ₹{Number(item?.price || 0).toFixed(2)}
                </Text>
                <Text style={styles.itemPrice}>x {1}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  itemRow: { flexDirection: 'row', alignItems: 'center', marginTop:5 },
  itemImage: { width: 70, height: 70, borderRadius: 8 },
  itemTitle: { fontFamily: fonts.Medium, color: Colors.black },
  itemDesc: {
    color: Colors.placeHolder,
    fontFamily: fonts.Regular,
    marginTop: 4,
    fontSize: fp(12),
  },
  itemPrice: { fontFamily: fonts.Medium, color: Colors.black },
  textStyle: { fontFamily: fonts.Medium, color: Colors.black }
});

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp, hp, wp } from '../../../helper/Responsive';
import Images from '../../../assets/Images';

type FavItem = {
  id: string;
  title: string;
  price: number;
  rating?: number;
  img?: any;
};

const initialFavs: FavItem[] = [
  { id: '1', title: 'Striped T‑shirt', price: 29.99, rating: 4.5, img: require('../../../assets/Images/productBoy.png') },
  { id: '2', title: 'Leather Sneakers', price: 89.0, rating: 4.8, img: require('../../../assets/Images/productGirl.png') },
  { id: '3', title: 'Denim Jacket', price: 119.5, rating: 4.6, img: require('../../../assets/Images/productBoy.png') },
];

const FavScreen = ({ navigation }: any) => {
  const [favs, setFavs] = useState<FavItem[]>(initialFavs);

  const removeFav = (id: string) => setFavs(prev => prev.filter(i => i.id !== id));

  const renderItem = ({ item }: { item: FavItem }) => (
    <View style={styles.card}>
      <Image source={item.img} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <View style={styles.ratingRow}>
            <Image source={Images.ratingStar} style={styles.star} />
            <Text style={styles.ratingTxt}>{item.rating?.toFixed(1)}</Text>
          </View>
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('HomeSectionSecScreeen')}>
            <Text style={styles.addTxt}>Add to Bag</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFav(item.id)}>
            <Text style={styles.removeTxt}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>

      {favs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySub}>Tap the heart on any product to add it here.</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('BottomNav')}>
            <Text style={styles.shopBtnTxt}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favs}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default FavScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary2, padding: 12 },
  header: { fontSize: fp(22), fontFamily: fonts.SemiBold, color: Colors.black, marginVertical: 8 },
  card: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 10, padding: 12, marginVertical: 8, alignItems: 'center', elevation: 2 },
  image: { width: 100, height: 100, borderRadius: 8, backgroundColor: '#f5f5f5' },
  info: { flex: 1, marginLeft: 12 },
  title: { fontFamily: fonts.SemiBold, fontSize: fp(16), color: Colors.black },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontFamily: fonts.Medium, color: Colors.third },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  star: { width: wp(14), height: hp(14), marginRight: 6 },
  ratingTxt: { fontFamily: fonts.Regular, color: Colors.placeHolder },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' },
  addBtn: { backgroundColor: Colors.third, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  addTxt: { color: Colors.white, fontFamily: fonts.Medium },
  removeTxt: { color: Colors.placeHolder, fontFamily: fonts.Medium },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontSize: fp(20), fontFamily: fonts.SemiBold, color: Colors.black, marginBottom: 8 },
  emptySub: { color: Colors.placeHolder, fontFamily: fonts.Regular, marginBottom: 16 },
  shopBtn: { backgroundColor: Colors.third, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  shopBtnTxt: { color: Colors.white, fontFamily: fonts.Medium },
});
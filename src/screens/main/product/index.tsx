import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    FlatList,
} from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp, hp, wp } from '../../../helper/Responsive';
import Images from '../../../assets/Images';
import ProductCard from '../../../component/ProductCard';

const { width } = Dimensions.get('window');

const sampleProduct = {
    id: 'p1',
    title: 'Classic Denim Jacket',
    price: 129.99,
    rating: 4.6,
    reviews: 289,
    description:
        'A timeless denim jacket with a modern relaxed fit. Made from premium cotton with subtle details and durable stitching. Perfect for layering year-round.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#2f6f9f', '#444444', '#f5d3c3'],
    images: [Images.productBoy, Images.productGirl],
};

const ProductScreen = ({ navigation }: any) => {
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState(sampleProduct.sizes[1]);
    const [selectedColor, setSelectedColor] = useState(sampleProduct.colors[0]);
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [giftApplied, setGiftApplied] = useState(false);

    const reviews = [
        {
            id: 'r1',
            name: 'Sophie',
            rating: 5,
            text: 'Amazing jacket — great fit and quality.',
        },
        {
            id: 'r2',
            name: 'Mark',
            rating: 4,
            text: 'Love the style. Slightly tight on sleeves.',
        },
    ];

    const similarProducts = [
        {
            id: 's1',
            productName: 'Washed Denim Jacket',
            price: 119.0,
            rating: { count: 120 },
            productLike: false,
        },
        {
            id: 's2',
            productName: 'Trucker Jacket',
            price: 139.0,
            rating: { count: 88 },
            productLike: true,
        },
        {
            id: 's3',
            productName: 'Leather Bomber',
            price: 189.0,
            rating: { count: 34 },
            productLike: false,
        },
    ];

    const increase = () => setQty(q => q + 1);
    const decrease = () => setQty(q => Math.max(1, q - 1));

    const applyCoupon = () => {
        if (coupon.trim().toUpperCase() === 'SAVE10') {
            setDiscount(10);
            setCouponApplied(true);
        } else {
            setDiscount(0);
            setCouponApplied(false);
        }
    };

    const applyGift = () => {
        setGiftApplied(true);
        setDiscount(d => d + 15);
    };

    const finalPrice = useMemo(
        () => Math.max(0, sampleProduct.price - discount),
        [sampleProduct.price, discount],
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageWrap}>
                    <Image
                        source={sampleProduct.images[0]}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{sampleProduct.title}</Text>

                    <View style={styles.rowBetween}>
                        <View style={styles.ratingRow}>
                            <Image source={Images.ratingStar} style={styles.star} />
                            <Text style={styles.ratingTxt}>{sampleProduct.rating}</Text>
                            <Text style={styles.reviewsTxt}>({sampleProduct.reviews})</Text>
                        </View>
                        <Text style={styles.price}>${sampleProduct.price.toFixed(2)}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Select size</Text>
                    <View style={styles.sizeRow}>
                        {sampleProduct.sizes.map(s => (
                            <TouchableOpacity
                                key={s}
                                style={[
                                    styles.sizeItem,
                                    selectedSize === s && styles.sizeItemActive,
                                ]}
                                onPress={() => setSelectedSize(s)}
                            >
                                <Text
                                    style={[
                                        styles.sizeTxt,
                                        selectedSize === s && { color: Colors.white },
                                    ]}
                                >
                                    {s}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Select color</Text>
                    <View style={styles.colorRow}>
                        {sampleProduct.colors.map(c => (
                            <TouchableOpacity
                                key={c}
                                onPress={() => setSelectedColor(c)}
                                style={[
                                    styles.colorSwatch,
                                    { backgroundColor: c },
                                    selectedColor === c && styles.colorActive,
                                ]}
                            />
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{sampleProduct.description}</Text>

                    <View style={{ height: 12 }} />

                    <View style={styles.offerCard}>
                        <Text style={styles.offerTitle}>Special Offer</Text>
                        <Text style={styles.offerTxt}>
                            Get extra $15 gift card on this purchase
                        </Text>
                        <TouchableOpacity
                            style={styles.giftBtn}
                            onPress={applyGift}
                            disabled={giftApplied}
                        >
                            <Text style={styles.giftTxt}>
                                {giftApplied ? 'Gift Applied' : 'Apply Gift'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.couponRow}>
                        <TextInput
                            value={coupon}
                            onChangeText={setCoupon}
                            placeholder="Enter coupon code"
                            style={styles.couponInput}
                        />
                        <TouchableOpacity
                            style={styles.applyCouponBtn}
                            onPress={applyCoupon}
                        >
                            <Text style={styles.applyCouponTxt}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    {couponApplied && (
                        <Text style={{ color: 'green', marginTop: 8 }}>
                            Coupon applied: -${discount.toFixed(2)}. Final: $
                            {finalPrice.toFixed(2)}
                        </Text>
                    )}

                    <View style={{ height: 12 }} />

                    <Text style={styles.sectionTitle}>Customer reviews</Text>
                    {reviews.map(r => (
                        <View key={r.id} style={styles.reviewCard}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={Images.activeProfile}
                                    style={styles.reviewAvatar}
                                />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text style={styles.reviewName}>{r.name}</Text>
                                    <Text style={styles.reviewText}>{r.text}</Text>
                                </View>
                                <Text style={styles.reviewRating}>{r.rating}★</Text>
                            </View>
                        </View>
                    ))}

                    <View style={{ height: 12 }} />

                    <Text style={styles.sectionTitle}>Similar products</Text>
                    <FlatList
                        data={similarProducts}
                        horizontal
                        keyExtractor={i => i.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={{ width: width / 2.4 }}>
                                <ProductCard item={item as any} index={index}  />
                            </View>
                        )}
                    />

                    <View style={[styles.rowBetween, { marginTop: 14 }]}>
                        <View style={styles.qtyBox}>
                            <TouchableOpacity onPress={decrease} style={styles.qtyBtn}>
                                <Text style={styles.qtySign}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtyVal}>{qty}</Text>
                            <TouchableOpacity onPress={increase} style={styles.qtyBtn}>
                                <Text style={styles.qtySign}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.wishlistBtn} onPress={() => { }}>
                            <Text style={styles.wishlistTxt}>♡ Add to wishlist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.cartBtn}
                    onPress={() => navigation.navigate('BagScreen')}
                >
                    <Text style={styles.cartTxt}>Add to Bag</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buyBtn}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text style={styles.buyTxt}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primary2 },
    imageWrap: {
        width: '100%',
        height: width * 0.9,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: { width: '90%', height: '100%', borderRadius: 12 },
    content: { padding: 16 },
    title: {
        fontFamily: fonts.SemiBold,
        fontSize: fp(20),
        color: Colors.black,
        marginBottom: 8,
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingRow: { flexDirection: 'row', alignItems: 'center' },
    star: { width: wp(14), height: hp(14), marginRight: 6 },
    ratingTxt: { fontFamily: fonts.Medium, marginRight: 6 },
    reviewsTxt: { color: Colors.placeHolder },
    price: { fontFamily: fonts.SemiBold, fontSize: fp(20), color: Colors.third },
    sectionTitle: { fontFamily: fonts.Medium, marginTop: 12, marginBottom: 8 },
    sizeRow: { flexDirection: 'row', gap: 10 },
    sizeItem: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: Colors.white,
        marginRight: 10,
    },
    sizeItemActive: { backgroundColor: Colors.black },
    sizeTxt: { fontFamily: fonts.Medium },
    colorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    colorSwatch: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#eee',
        marginRight: 10,
    },
    colorActive: { borderColor: Colors.black, borderWidth: 2 },
    description: {
        color: Colors.placeHolder,
        fontFamily: fonts.Regular,
        lineHeight: 20,
    },
    qtyBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 8,
    },
    qtyBtn: { padding: 10 },
    qtySign: { fontSize: fp(18) },
    qtyVal: { minWidth: 28, textAlign: 'center', fontFamily: fonts.Medium },
    wishlistBtn: { paddingHorizontal: 12, paddingVertical: 6 },
    wishlistTxt: { color: Colors.placeHolder },
    footer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: Colors.primary2,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    cartBtn: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: 14,
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
    },
    cartTxt: { fontFamily: fonts.Medium },
    buyBtn: {
        flex: 1,
        backgroundColor: Colors.third,
        paddingVertical: 14,
        borderRadius: 8,
        marginLeft: 8,
        alignItems: 'center',
    },
    buyTxt: { color: Colors.white, fontFamily: fonts.SemiBold },
    offerCard: {
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 10,
        elevation: 2,
        marginVertical: 8,
    },
    offerTitle: { fontFamily: fonts.Medium, marginBottom: 4 },
    offerTxt: { color: Colors.placeHolder, fontFamily: fonts.Regular },
    giftBtn: {
        marginTop: 8,
        backgroundColor: Colors.third,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    giftTxt: { color: Colors.white, fontFamily: fonts.Medium },
    couponRow: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
    couponInput: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 8,
    },
    applyCouponBtn: {
        marginLeft: 8,
        backgroundColor: Colors.black,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
    },
    applyCouponTxt: { color: Colors.white, fontFamily: fonts.Medium },
    reviewCard: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginVertical: 6,
        elevation: 1,
    },
    reviewAvatar: { width: 40, height: 40, borderRadius: 20 },
    reviewName: { fontFamily: fonts.Medium },
    reviewText: {
        color: Colors.placeHolder,
        marginTop: 4,
        fontFamily: fonts.Regular,
    },
    reviewRating: { fontFamily: fonts.Medium, marginLeft: 10 },
});

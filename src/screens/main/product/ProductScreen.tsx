import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, FlatList, ActivityIndicator, } from 'react-native';
import Colors from '../../../helper/Colors';
import fonts from '../../../assets/fonts';
import { fp, hp, wp } from '../../../helper/Responsive';
import Images from '../../../assets/Images';
import ProductCard from '../../../component/ProductCard';
import RestApi from '../../../Api/RestApi';
import showToast from '../../../utils/showToast';
import { CustomerReviewProps, ProductProps } from '../../../helper/interface';
import { useAppDispatch, useAppSelector } from '../../../Redux/reducers/hooks';
import { addToBag } from '../../../Redux/reducers/ProductReducer';
import CustomerHeader from '../../../component/headeComponent/CustomerHeader';
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

const ProductScreen = ({ navigation, route }: any) => {
    const { productId } = route?.params
    const dispatch = useAppDispatch()
    const bagItem = useAppSelector((state) => state.product.bag)
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [giftApplied, setGiftApplied] = useState(false);
    const [product, setProduct] = useState<ProductProps | null>(null)
    const [loading, setLoading] = useState(false)
    const [hitToLike, setHitToLike] = useState(false)
    const [selectedSize, setSelectedSize] = useState(sampleProduct.sizes[1]);
    const [selectedColor, setSelectedColor] = useState("");
    const [customerReview, setCustomerReview] = useState<CustomerReviewProps[]>([])


    useEffect(() => {
        getProductInfoHandler(productId)
        getCustomerReviewHandler(productId)
    }, [])

    const isItemAddedAlready = bagItem?.filter(item => item._id === productId)

    console.log("isItemAddedAlready", isItemAddedAlready);



    const getProductInfoHandler = async (productId: number | string) => {
        setLoading(true)
        try {
            const res = await RestApi({
                method: "GET",
                endpoint: `product/getProductById?productId=${productId}`
            })
            if (!res) return showToast({ message: res?.message })
            console.log("response single product response", res?.result)
            console.log("response", res?.result)
            setProduct(res?.result)
        } catch (error) {
            console.log("catch Error", error);
        } finally {
            setLoading(false)
        }
    }

    const getCustomerReviewHandler = async (productId: number | string) => {
        try {
            const res = await RestApi({
                endpoint: `product/getProductReview?productId=${productId}&page=1&limit=3`,
                method: "GET"
            })
            if (!res) return console.log("No customer Review")
            setCustomerReview(res?.result?.reviews)
        } catch (error) {
            console.log("catch Error to getting customer. review ", error)
        }
    }

    const similarProducts = [
        {
            id: 's1',
            productName: 'Washed Denim Jacket',
            price: 119.0,
            rating: 120,
            productLike: false,
        },
        {
            id: 's2',
            productName: 'Trucker Jacket',
            price: 139.0,
            rating: 88,
            productLike: true,
        },
        {
            id: 's3',
            productName: 'Leather Bomber',
            price: 189.0,
            rating: 34,
            productLike: false,
        },
    ];

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
    const addToBagHandler = (item: ProductProps | null) => {
        if (!item) return
        dispatch(addToBag(item))
    };

    return (
        <View style={styles.container}>
            <CustomerHeader backHandler={true} />
            <View style={{ justifyContent: "center", flex:1 }}>
                {
                    loading ? <ActivityIndicator color={Colors.secondary} /> :
                        <>
                            <ScrollView>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => setHitToLike(!hitToLike)} style={styles.hitToLike}>
                                    <Image source={hitToLike ? Images.activeFav : Images.inactiveFav} style={{ height: 23, width: 23 }} />
                                </TouchableOpacity>
                                <View style={styles.imageWrap}>
                                    <Image
                                        source={product?.imageUrl?.url ? { uri: product?.imageUrl?.url } : sampleProduct.images[0]}
                                        style={styles.image}
                                        resizeMode="contain"
                                    />
                                </View>


                                <View style={styles.content}>
                                    <Text style={styles.title}>{product?.productName}</Text>

                                    <View style={styles.rowBetween}>
                                        <View style={styles.ratingRow}>
                                            <Image source={Images.ratingStar} style={styles.star} />
                                            <Text style={styles.ratingTxt}>{product?.rating}</Text>
                                            <Text style={styles.reviewsTxt}>({product?.numberOfReviews})</Text>
                                        </View>
                                        <Text style={styles.price}>₹{product?.price.toFixed(2)}</Text>
                                    </View>

                                    <Text style={styles.sectionTitle}>Select size</Text>

                                    <View style={styles.sizeRow}>
                                        {product?.size.map(s => (
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
                                        {product?.color.map(c => (
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
                                    <Text style={styles.description}>{product?.description}</Text>

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

                                    {
                                        customerReview?.length > 0 && (
                                            <View style={{ marginTop: 12 }}>
                                                <Text style={styles.sectionTitle}>Customer reviews</Text>
                                                {customerReview.map(r => (
                                                    <View style={styles.reviewCard}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image
                                                                source={Images.activeProfile}
                                                                style={styles.reviewAvatar}
                                                            />
                                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                                <Text style={styles.reviewName}>{r.name}</Text>
                                                                <Text style={styles.reviewText}>{r.comment}</Text>
                                                            </View>
                                                            <Text style={styles.reviewRating}>{Number(r.rating)}★</Text>
                                                        </View>
                                                    </View>
                                                ))}
                                                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("ViewallProductReviewScreen", { productId: productId })}>
                                                    <Text style={styles.ViewAll}>View all</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }

                                    <View style={{ height: 12 }} />

                                    <Text style={styles.sectionTitle}>Similar products</Text>
                                    <FlatList
                                        data={similarProducts}
                                        horizontal
                                        keyExtractor={(_, i) => i.toString()}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <ProductCard item={item as any} index={index} />
                                        )}
                                    />
                                </View>
                            </ScrollView>
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={styles.cartBtn}
                                    onPress={() => addToBagHandler(product)}
                                >
                                    <Text style={styles.cartTxt}>{isItemAddedAlready.length > 0 ? "Item added" : "Add to Bag"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buyBtn}
                                    onPress={() => {
                                        if (!product) return
                                        dispatch(addToBag(product))
                                        navigation.replace('CheckoutScreen')
                                    }}
                                >
                                    <Text style={styles.buyTxt}>Buy Now</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }

            </View>

        </View>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.primary2, },
    imageWrap: {
        width: '100%',
        height: width * 0.9,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hitToLike: { alignSelf: "flex-end", marginRight: 30, marginTop: 10, zIndex: 1, position: "absolute", backgroundColor: "#fff", elevation: 20, shadowColor: "#000", borderRadius: 50, height: 39, width: 40, alignItems: "center", justifyContent: "center" },
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
        elevation: 10,
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
        elevation: 10,

    },
    ViewAll: { fontFamily: fonts.SemiBold, fontSize: fp(12), color: Colors.third, alignSelf: "flex-end", marginTop: 10 },
    colorActive: { borderColor: Colors.black, borderWidth: 2 },
    description: {
        color: Colors.placeHolder,
        fontFamily: fonts.Regular,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: Colors.primary2,
        borderTopWidth: 1,
        borderTopColor: Colors.secondary,
    },
    cartBtn: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: 14,
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
        elevation: 5
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
    couponRow: { flexDirection: 'row', marginTop: 12, alignItems: 'center', },
    couponInput: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 8,
        elevation: 2
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

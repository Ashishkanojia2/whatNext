import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../helper/Colors'
import fonts from '../../../assets/fonts'
import Images from '../../../assets/Images'
import RestApi from '../../../Api/RestApi'
import { CustomerReviewProps } from '../../../helper/interface'
import Header from '../../../component/Header'

const ViewallProductReviewScreen = ({ route }: any) => {
    const { productId } = route.params
    console.log("productId", productId);

    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [dataLoading, setDataLoading] = useState(false)
    const [customerReview, setCustomerReview] = useState<CustomerReviewProps[]>([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        setCustomerReview([])
        setHasMore(true)
        setPage(1)
        getCustomerReviewHandler(productId, 1)
    }, [productId])

    useEffect(() => {
        if (page > 1) {
            getCustomerReviewHandler(productId, page)
        }
    }, [page])


    const getCustomerReviewHandler = async (productId: number | string, currentPage: number) => {
        if (dataLoading) return
        setDataLoading(true)
        try {
            const res = await RestApi({
                endpoint: `product/getProductReview?productId=${productId}&page=${currentPage}&limit=10`,
                method: "GET",
            })
            const result = res?.result

            const reviews = Array.isArray(result.reviews) ? result.reviews : []

            if (currentPage === 1) {
                setCustomerReview(reviews)
            } else {
                setCustomerReview(prev => [...prev, ...reviews])
            }
            setHasMore(Boolean(result.hasMore))
        } catch (error) {
            console.log("catch Error to getting customer. review ", error)
        } finally {
            setDataLoading(false)
            setRefreshing(false)
        }
    }

    const handleLoadMore = () => {
        if (hasMore && !dataLoading) {
            setPage(prev => prev + 1)
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        setPage(1)
        getCustomerReviewHandler(productId, 1)
    }


    const renderItem = ({ item }: { item: CustomerReviewProps }) => {
        return (
            <View style={styles.reviewCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={Images.activeProfile}
                        style={styles.reviewAvatar}
                    />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text style={styles.reviewName}>{item?.name}</Text>
                        <Text style={styles.reviewText}>{item?.comment}</Text>
                    </View>
                    <Text style={styles.reviewRating}>{Number(item?.rating)}★</Text>
                </View>
            </View>
        )
    }
    return (
        <>
            <Header showLeftIcon title='Reviews' />
            <View style={styles.rootContainer}>
                <FlatList
                    data={customerReview}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={(item) => renderItem(item)}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    ListFooterComponent={() => (dataLoading ? <ActivityIndicator color={Colors.secondary} style={{ alignSelf: 'center', marginVertical: 12 }} /> : null)}
                    ListEmptyComponent={() => (
                        !dataLoading ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
                                <Text>No reviews yet</Text>
                            </View>
                        ) : null
                    )}
                    contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                />
            </View>
        </>
    )
}

export default ViewallProductReviewScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
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
})

import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProductProps } from '../helper/interface';
import ProductCard from './ProductCard';
import { useAppDispatch, useAppSelector } from '../Redux/reducers/hooks';
import { setWishList } from '../Redux/reducers/ProductReducer';
interface ProductComponentProps {
    product: ProductProps[];
    listHeaderComponent?: React.ReactElement;
    listHeaderComponentStyle?: object;
}
const ProductComponent = ({ product, listHeaderComponent, listHeaderComponentStyle }: ProductComponentProps) => {

    const dispatch = useAppDispatch();
    const { wishList } = useAppSelector((state) => state.product)
    console.log("wishList", wishList);

    const wishListHandler = async (product: ProductProps) => {
        try {
        if (wishList.some((p) => p._id === product._id)) {
            const updatedWishList = wishList.filter((p) => p._id !== product._id);
            dispatch(setWishList(updatedWishList));
            return;
        }
            dispatch(setWishList([...wishList, product]))
        } catch (error) {
            console.log("Catch Error", error);
        }
    }

    const renderItem = ({ item, index, }: {
        item: ProductProps;
        index: number;
    }) => {
        return (
            <ProductCard item={item} index={index} wishListHandler={wishListHandler} wishlist={wishList} />
        );
    };

    return (
        <FlatList
            data={product}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={listHeaderComponent}
            ListHeaderComponentStyle={listHeaderComponentStyle}
        />
    )
}

export default ProductComponent

const styles = StyleSheet.create({})
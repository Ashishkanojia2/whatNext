import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps } from '../../helper/interface';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [] as ProductProps[],
    wishList: [] as ProductProps[],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setWishList: (state, action: PayloadAction<ProductProps[]>) => {
      state.wishList = action.payload;
    },
  },
});

export const { setProducts, setWishList } = productSlice.actions;
export default productSlice.reducer;

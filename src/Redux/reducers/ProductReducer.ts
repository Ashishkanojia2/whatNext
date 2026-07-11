import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps } from '../../helper/interface';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [] as ProductProps[],
    wishList: [] as ProductProps[],
    bag: [] as ProductProps[],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setWishList: (state, action: PayloadAction<ProductProps[]>) => {
      state.wishList = action.payload;
    },
    addToBag: (state, action: PayloadAction<ProductProps>) => {
      const item = action.payload;
      const existingItem = state.bag.find(i => i._id === item._id);

      if (!existingItem) {
        state.bag.push({
          ...item,
          qty: 1,
        });
      } else {
        existingItem.qty += 1;
      }
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.bag.find(i => i._id === id);

      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
        } else {
          state.bag = state.bag.filter(i => i._id !== id);
        }
      }
    },

    removeFromBag: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.bag = state.bag.filter(i => i._id !== id);
    },

    clearBag: state => {
      state.bag = [];
    },
  },
});

export const {
  setProducts,
  setWishList,
  addToBag,
  decreaseQty,
  removeFromBag,
  clearBag,
} = productSlice.actions;
export default productSlice.reducer;

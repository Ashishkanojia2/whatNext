import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface productDetails {
  id?: number;
  productName?: string;
  price?: number;
  description?: string;
  image?: string;
}
interface feedBackDetails {
  id?: number;
  title?: string;
  description?: string;
  rating?: number;
}
interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  orderHistory?: productDetails[];
  FeedBackHistory?: feedBackDetails[];
  likedProducts?: productDetails[];
}

interface UserStateProps {
  user: string;
  userData: UserData;
}

const initialState: UserStateProps = {
  user: '',
  userData: {},
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setuserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
});

export const { setuserData } = userSlice.actions;
export default userSlice.reducer;

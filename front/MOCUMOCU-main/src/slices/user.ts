import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Coupon {
  couponId: number;
  marketName: string;
}
interface initialState {
  name: String;
  email: String;
  accessToken: String;
  id: number;
  coupons: Coupon[];
}
const initialState: initialState = {
  name: '',
  email: '',
  accessToken: '',
  id: 0,
  coupons: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setUserId(state, action) {
      state.id = action.payload.id;
    },
    setCoupon(state, action: PayloadAction<Coupon>) {
      state.coupons.push(action.payload);
    },
    deleteCoupon(state, action) {
      const index = state.coupons.findIndex(v => v.couponId === action.payload);
      if (index > -1) {
        state.coupons.splice(index, 1);
      }
    },
  },
  extraReducers: builder => {}, // 비동기 action 만들 때 사용
});

export default userSlice;

import {createSlice} from '@reduxjs/toolkit';

export interface Coupon {
  couponId: number;
  marketName: string;
  currentStamp: number;
}
export interface UserInfo {
  name: String;
  email: String;
  accessToken: String;
  id: number;
}
interface initialState {
  name: String;
  email: String;
  accessToken: String;
  id: number;
}
interface initialCouponState {
  coupons: Coupon[];
}
const initialState: initialState = {
  name: '',
  accessToken: '',
  id: 0,
  email: '',
};
const initialCouponState: initialCouponState = {
  coupons: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state = initialState, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      // state.id = action.payload.id;
    },
    extraReducers: builder => {}, // 비동기 action 만들 때 사용
  },
});

export default userSlice;

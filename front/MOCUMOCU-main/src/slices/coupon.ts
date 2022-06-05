import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Coupon {
  couponId: number;
  marketName: string;
  currentStamp: number;
}

interface initialState {
  coupons: Coupon[];
}
const initialState: initialState = {
  coupons: [],
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    setCouponInfo(state = initialState, action: PayloadAction<Coupon[]>) {
      state.coupons = action.payload;
      // state.id = action.payload.id;
    },
    extraReducers: builder => {}, // 비동기 action 만들 때 사용
  },
});

export default couponSlice;

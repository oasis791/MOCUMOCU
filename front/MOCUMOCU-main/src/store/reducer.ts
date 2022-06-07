import {combineReducers} from 'redux';

import userSlice from '../slices/user';
import storeOwnerSlice from '../slices/marketOwner';
import couponSlice from '../slices/coupon';
import userSliceTest from '../slices/userTest';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  coupon: couponSlice.reducer,
  marketOwner: storeOwnerSlice.reducer,
  userTest: userSliceTest.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

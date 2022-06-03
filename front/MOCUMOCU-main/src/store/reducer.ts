import {combineReducers} from 'redux';

import userSlice from '../slices/user';
import storeOwnerSlice from '../slices/storeOwner';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  storeOwner: storeOwnerSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

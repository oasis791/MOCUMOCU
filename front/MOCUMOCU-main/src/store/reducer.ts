import { combineReducers } from 'redux';

import userSlice from '../slices/user';
import storeOwnerSlice from '../slices/marketOwner';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  marketOwner: storeOwnerSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

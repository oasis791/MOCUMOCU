import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  name: '',
  email: '',
  accessToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: builder => { }, // 비동기 action 만들 때 사용
});

export default userSlice;

import {createSlice} from '@reduxjs/toolkit';

export interface UserInfo {
  name: string;
  email: string;
  accessToken: string;
  id: number;
}
interface initialState {
  name: string;
  email: string;
  accessToken: string;
  id: number;
}

const initialState: initialState = {
  name: '',
  accessToken: '',
  id: 0,
  email: '',
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
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  extraReducers: builder => {}, // 비동기 action 만들 때 사용=======>>>>>>> su
});

export default userSlice;

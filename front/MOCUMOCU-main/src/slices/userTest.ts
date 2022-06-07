import {createSlice} from '@reduxjs/toolkit';

export interface UserInfoTest {
  name: String;
  email: String;
  id: number;
  userType: String;
  isLoggedIn: boolean;
}
interface initialState {
  name: String;
  email: String;
  id: number;
  userType: String;
  isLoggedIn: boolean;
}

const initialState: initialState = {
  name: '',
  id: 0,
  email: '',
  userType: '',
  isLoggedIn: false,
};

const userSliceTest = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfoTest(state = initialState, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.userType = action.payload.userType;
      state.isLoggedIn = action.payload.isLoggedIn;
      // state.id = action.payload.id;
    },
    // setAccessToken(state, action) {
    //   state.accessToken = action.payload;
    // },
  },
  extraReducers: builder => {}, // 비동기 action 만들 때 사용=======>>>>>>> su
});

export default userSliceTest;

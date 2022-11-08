import {createSlice} from '@reduxjs/toolkit';

export interface UserInfoTest {
  logIn: any;
  name: string;
  email: string;
  id: number;
  userType: string;
  isLogIn: boolean;
}
interface initialStateTest {
  name: string;
  email: string;
  id: number;
  userType: string;
  isLogIn: boolean;
}

const initialState: initialStateTest = {
  name: '김준서',
  id: 0,
  email: 'jykim9868@gmail.com',
  userType: '',
  isLogIn: false,
};

const userSliceTest = createSlice({
  name: 'userTest',
  initialState,
  reducers: {
    setUserInfoTest(state = initialState, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.userType = action.payload.userType;
      state.isLogIn = action.payload.isLogIn;
      // state.id = action.payload.id;
    },
    // setAccessToken(state, action) {
    //   state.accessToken = action.payload;
    // },
    setLoginType(state, action) {
      state.isLogIn = action.payload.isLogIn;
      state.userType = action.payload.userType;
    },
  },
  extraReducers: builder => {}, // 비동기 action 만들 때 사용=======>>>>>>> su
});

export default userSliceTest;

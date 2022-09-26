// merge test
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from './src/pages/SignIn';
import SignInOwner from './src/pages/SignInOwner';
import SignUp from './src/pages/SignUp';
import SignUpOwner from './src/pages/SignUpOwner';
import InitScreen from './src/pages/InitScreen';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';
import { useAppDispatch } from './src/store';
import { useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import axios, { AxiosError } from 'axios';
import userSlice from './src/slices/user';
import Config from 'react-native-config';
import FindPassword from './src/pages/FindPassword';
import FindPasswordOwner from './src/pages/FindPasswordOwner';
import FindIdOwner from './src/pages/FindIdOwner';
import FindId from './src/pages/FindId';
import CustomerWrapper from './src/pages/CustomerWrapper';
import OwnerWrapper from './src/pages/OwnerWrapper';
import userSliceTest from './src/slices/userTest';

const Stack = createNativeStackNavigator();
function AppInner() {
  // const isLoggedIn = useSelector(
  //   (state: RootState) => !!state.user.accessToken,
  // );
  const isLogIn = useSelector((state: RootState) => state.userTest.isLogIn);
  const userType = useSelector((state: RootState) => state.userTest.userType);
  // const userType = 'Owner';
  // const userTypeTest = 'Customer';
  const dispatch = useAppDispatch();
  // const isLoggedIn = false;

  // 앱 실행 시 토큰 있으면 로그인하는 코드
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      SplashScreen.hide();
      try {
        const token = isLogIn;
        if (!token) {
          console.log('!token');
          SplashScreen.hide();
          return;
        }
        const response = await axios.post('http://15.164.100.68:8080/token', {
          isLogIn: isLogIn,
          userType: userType,
        });
        // dispatch(
        //   userSlice.actions.setUserInfo({
        //     name: response.data.data.name,
        //     id: response.data.data.id,
        //     email: response.data.data.email,
        //     accessToken: response.data.data.accessToken,3
        //   }),
        // );
        // dispatch(
        //   userSliceTest.actions.setLoginType({
        //     // name: response.data.data.name,
        //     // id: response.data.data.id,
        //     // email: response.data.data.email,
        //     userType: response.data.userType,
        //     isLogIn: response.data.logIn,
        //   }),
        // );
        console.log('AppInner log(userType)', userType);
        console.log('AppInner log(isLogin)', isLogIn);
      } catch (error) {
        console.error(error);
        if ((error as AxiosError<any>).response?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      } finally {
        // console.log('asdf');
        SplashScreen.hide();
      }
    };
    getTokenAndRefresh();
  }, [dispatch, isLogIn, userType]);

  return isLogIn ? (
    userType === 'Owner' ? (
      <OwnerWrapper />
    ) : (
      <CustomerWrapper />
    )
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="InitScreen"
        component={InitScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignInOwner"
        component={SignInOwner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpOwner"
        component={SignUpOwner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="findId"
        component={FindId}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindIdOwner"
        component={FindIdOwner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindPassword"
        component={FindPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindPasswordOwner"
        component={FindPasswordOwner}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default AppInner;

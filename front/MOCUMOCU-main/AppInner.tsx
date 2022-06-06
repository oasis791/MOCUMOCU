import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from './src/pages/SignIn';
import SignInOwner from './src/pages/SignInOwner';
import SignUp from './src/pages/SignUp';
import SignUpOwner from './src/pages/SignUpOwner';
import InitScreen from './src/pages/InitScreen';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import {useAppDispatch} from './src/store';
import {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import axios, {AxiosError} from 'axios';
import userSlice from './src/slices/user';
import Config from 'react-native-config';
import FindPassword from './src/pages/FindPassword';
import FindPasswordOwner from './src/pages/FindPasswordOwner';
import FindIdOwner from './src/pages/FindIdOwner';
import FindId from './src/pages/FindId';
import CustomerWrapper from './src/pages/CustomerWrapper';
import OwnerWrapper from './src/pages/OwnerWrapper';

const Stack = createNativeStackNavigator();
function AppInner() {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );
  const isOwner = false;
  const dispatch = useAppDispatch();
  // const isLoggedIn = false;

  // 앱 실행 시 토큰 있으면 로그인하는 코드
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      SplashScreen.hide();
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          console.log('!token');
          SplashScreen.hide();
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUserInfo({
            name: response.data.data.name,
            id: response.data.data.id,
            email: response.data.data.email,
            accessToken: response.data.data.accessToken,
          }),
        );
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
  }, [dispatch]);
  //Access Token 재발급 interceptor
  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const originalRequest = config;
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            // token refresh 요청
            const {data} = await axios.post(
              `${Config.API_URL}/refreshToken`, // token refresh api
              {},
              {headers: {authorization: `Bearer ${refreshToken}`}},
            );
            // 새로운 토큰 저장
            dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
            originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
            // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch]);

  return !isLoggedIn ? (
    !isOwner ? (
      <OwnerWrapper />
    ) : (
      <CustomerWrapper />
    )
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="InitScreen"
        component={InitScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignInOwner"
        component={SignInOwner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpOwner"
        component={SignUpOwner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="findId"
        component={FindId}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindIdOwner"
        component={FindIdOwner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindPassword"
        component={FindPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FindPasswordOwner"
        component={FindPasswordOwner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AppInner;

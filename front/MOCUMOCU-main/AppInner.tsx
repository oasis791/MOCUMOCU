import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
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
import findPassword from './src/pages/FindPassword';
import findPasswordOwner from './src/pages/FindPasswordOwner';
import findIdOwner from './src/pages/FindIdOwner';
import findId from './src/pages/FindId';
import MainWrapper from './src/pages/MainWrapper';
import CustomShop from './src/pages/CustomShop';
import MainOwnerWrapper from './src/pages/MainOwnerWrapper';
import PointLog from './src/pages/PointLog';

const Stack = createNativeStackNavigator();
function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const isOwner = false;
  const dispatch = useAppDispatch();
  // const isLoggedIn = false;

  // 앱 실행 시 토큰 있으면 로그인하는 코드
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      // SplashScreen.hide();
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
          userSlice.actions.setUser({
            name: response.data.data.name,
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

  return !isLoggedIn ? (
    isOwner ? (
      <Stack.Navigator>
        <Stack.Screen
          name="MainOwnerWrapper"
          component={MainOwnerWrapper}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsOwner"
          component={SettingsOwner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoticeOwner"
          component={NoticeOwner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddStore"
          component={AddStore}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StoreInfo"
          component={StoreInfo}
          options={{headerShown: false}}
        />
        {/* 매장 상세보기 탭 */}
        <Stack.Screen
          name="ModifyStore"
          component={ModifyStore}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddEvent"
          component={AddEvent}
          options={{headerShown: false}}
        />
        {/* 매장 상세보기 탭 */}
        <Stack.Screen
          name="StoreAnalysis"
          component={StoreAnalysis}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyOwner"
          component={PrivacyOwner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HelpOwner"
          component={HelpOwner}
          options={{headerShown: false}}
        />
        {/* 점주 홈 화면 탭 */}
        <Stack.Screen
          name="ModifyInfoOwner"
          component={ModifyInfoOwner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DevInfoOwner"
          component={DevInfoOwner}
          options={{headerShown: false}}
        />
        {/* 점주 더보기 탭 */}
        <Stack.Screen
          name="StampControl"
          component={StampControl}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRcodeScanner"
          component={QRcodeScanner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PhoneNumScanner"
          component={PhoneNumScanner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StampAmount"
          component={StampAmount}
          options={{headerShown: false}}
        />
        {/* 점주 적립/사용 탭 */}
      </Stack.Navigator>
    ) : (
      //회원 파트
      <Stack.Navigator>
        <Stack.Screen
          name="MainWrapper"
          component={MainWrapper}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventInfo"
          component={EventInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notice"
          component={Notice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CustomShop"
          component={CustomShop}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PointLog"
          component={PointLog}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CouponList"
          component={CouponList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CouponInfo"
          component={CouponInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{headerShown: false}}
        />
        {/* 홈 탭 */}

        <Stack.Screen
          name="ModifyUserInfo"
          component={ModifyInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UsageHistory"
          component={UsageHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DevInfo"
          component={DevInfo}
          options={{headerShown: false}}
        />
        {/* 더보기 탭 */}

        <Stack.Screen
          name="RewardList"
          component={RewardList}
          options={{headerShown: false}}
        />
        {/* 쿠폰 사용 및 적립 탭 */}
      </Stack.Navigator>
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
        component={findId}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="findIdOwner"
        component={findIdOwner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="findPassword"
        component={findPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="findPasswordOwner"
        component={findPasswordOwner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AppInner;

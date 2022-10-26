import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {NavigationContainer} from '@react-navigation/native';
import {PortalProvider} from '@gorhom/portal';
import {Coupon} from './src/pages/SaveUseComponent/RewardList';
import {Select} from './src/pages/SaveUseComponent/UseCoupon';
export type LoggedInUserParamList = {
  /** MainComponent Type  */
  Main: undefined;
  Settings: undefined;
  PushNotice: undefined; // 푸시알림
  Notice: undefined; // 공지사항
  QnA: undefined;
  CouponDetail: undefined;
  SelectCustomizing: Customizing;

  /** MoreComponent Type */
  More: undefined;
  ModifyUserAccount: undefined;
  TermsOfUse: undefined;
  CouponUsageHistory: undefined;
  MyPointLog: undefined; // 더보기랑 메인 둘 다 해당
  DevInfo: undefined;

  /** SaveUseComponent Type */
  SaveUseCoupon: undefined;
  UseCoupon: undefined;
  RewardList: Select;
  UseQR: Coupon;

  // EventInfo: undefined;
  CustomShop: undefined;
  // Help: undefined;
  // orderId : parameter 칸 => 주문에 고유한 ID가 부여되어 있음 이걸 변수처럼 사용하기 위해서 넣어줌
}; // -> 로그인 했을 때 보이는 페이지들

export type LoggedInOwnerParamList = {
  MainOwnerWrapper: undefined;
  SaveUpOwnerWrapper: undefined;

  MainOwner: undefined;
  SaveUpOwner: undefined;
  StampControl: undefined;
  SettingsOwner: undefined;
  AddMarket: undefined;
  MarketReward: {marketIndex: number};
  MarketInfo: {marketIndex: number};

  NoticeOwner: undefined;
  ModifyStore: undefined;
  AddEvent: undefined;
  MarektAnalysis: undefined;
  PrivacyOwner: undefined;
  HelpOwner: undefined;
  ModifyInfoOwner: undefined;
  DevInfoOwner: undefined;
  QRCodeScanner: {marketId: number; type: 'saveUp' | 'use'};
  PhoneNumScanner: {marketId: number};
  StampAmount: {marketId: number; customerId: number};
  SaveUp: undefined;
  MarketFunc: undefined;
  // orderId : parameter 칸 => 주문에 고유한 ID가 부여되어 있음 이걸 변수처럼 사용하기 위해서 넣어줌
};

// 타입을 나눠 놓은 이유 -> 합쳐도 큰 문제는 되지 않지만 화면에 나타내는 조건이 달라서 나눠놓음
//export -> 다른 파일에서 import 가능 => 타입도 다른 파일로 export, import 가능
export type RootStackParamList = {
  SignIn: undefined;
  SignInOwner: undefined;
  SignUp: undefined;
  SignUpOwner: undefined;
  InitScreen: undefined;
  FindId: undefined;
  FindIdOwner: undefined;
  FindPassword: undefined;
  FindPasswordOwner: undefined;
  AppInner: undefined;
}; // -> 이 타입은 로그인 안 했을 때 보이는 페이지들

function App() {
  // const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <Provider store={store}>
      <PortalProvider>
        <NavigationContainer>
          <AppInner />
        </NavigationContainer>
      </PortalProvider>
    </Provider>
  );
}

export default App;

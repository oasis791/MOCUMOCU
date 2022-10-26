import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Settings from './MainComponent/Settings';
import TabWrapper from './TabWrapper';
import ModifyUserAccount from './MoreComponent/ModifyUserAccount';
import UseCoupon from './SaveUseComponent/UseCoupon';
import RewardList from './SaveUseComponent/RewardList';
import UseQR from './SaveUseComponent/UseQR';
import CouponUsageHistory from './MoreComponent/CouponUsageHistory';
import TermsOfUse from './MoreComponent/TermsOfUse';
import DevInfo from './MoreComponent/DevInfo';
import CustomShop from './MoreComponent/CustomShop';
import CouponDetail from './MainComponent/CouponDetail';
import PushNotice from './MainComponent/PushNotice';
import MyPointLog from './MoreComponent/MyPointLog';
import Notice from './MainComponent/Notice';
import QnA from './MainComponent/QnA';
import SelectCustomizing from './MainComponent/SelectCustomizing';

const Stack = createNativeStackNavigator();
function StackWrapper() {
  return (
    <Stack.Navigator>
      {/* 탭 눌렀을 때 */}
      <Stack.Screen
        name="Main"
        component={TabWrapper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="More"
        component={TabWrapper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SaveUseCoupon"
        component={TabWrapper}
        options={{headerShown: false}}
      />

      {/* 홈 스택 */}
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PushNotice"
        component={PushNotice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CouponDetail"
        component={CouponDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPointLog"
        component={MyPointLog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectCustomizing"
        component={SelectCustomizing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notice"
        component={Notice}
        options={{headerShown: false}}
      />
      <Stack.Screen name="QnA" component={QnA} options={{headerShown: false}} />

      {/* 더보기 스택 */}
      <Stack.Screen
        name="CustomShop"
        component={CustomShop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ModifyUserAccount"
        component={ModifyUserAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CouponUsageHistory"
        component={CouponUsageHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DevInfo"
        component={DevInfo}
        options={{headerShown: false}}
      />

      {/* 적립 / 사용 스택 */}
      <Stack.Screen
        name="UseCoupon"
        component={UseCoupon}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RewardList"
        component={RewardList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UseQR"
        component={UseQR}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StackWrapper;

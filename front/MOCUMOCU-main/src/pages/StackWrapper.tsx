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
import Help from './MoreComponent/Help';
import CustomShop from './MoreComponent/CustomShop';
import CouponDetail from './MainComponent/CouponDetail';
import MyPointLog from './MoreComponent/MyPointLog';
import Notice from './MainComponent/Notice';
import QnA from './MainComponent/QnA';
import SelectCustomizing from './MainComponent/SelectCustomizing';
import ChangePassword from './MoreComponent/ChangePassword';
import CouponReserveHelp from './MoreComponent/CouponReserveHelp';
import CouponUsageHelp from './MoreComponent/CouponUsageHelp';
import CustomizingHelp from './MoreComponent/CustomizingHelp';

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
        name="Help"
        component={Help}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CouponReserveHelp"
        component={CouponReserveHelp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CouponUsageHelp"
        component={CouponUsageHelp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomizingHelp"
        component={CustomizingHelp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
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

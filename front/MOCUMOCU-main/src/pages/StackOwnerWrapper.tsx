import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabOwnerWrapper from './TabOwnerWrapper';
import SettingsOwner from './SettingsOwner';
import AddMarket from './AddMarket';
import MarketInfo from './MarketInfo';
import MarketReward from './MarketReward';
import StampAmount from './StampAmount';
import StampControl from './StampControl';
import SaveUpOwner from './SaveUpOwner';
import PhoneNumScanner from './PhoneNumScanner';
import QRCodeScanner from './QRCodeScanner';
import EventControl from './EventControl';
import MarketAnalysis from './MarketAnalysis';
import ModifyMarket from './ModifyMarket';
import MarketCouponLog from './MarketCouponLog';
import AddEvent from './AddEvent';
import ModifyOwnerAccount from './ModifyOwnerAccount';
import PrivacyPolicyOwner from './PrivacyPolicyOwner';
import ModifyOwnerPassword from './ModifyOwnerPassword';
const Stack = createNativeStackNavigator();
function StackOwnerWrapper() {
  return (
    <Stack.Navigator>
      {/* 탭 눌렀을 때 */}
      <Stack.Screen
        name="MainOwner"
        component={TabOwnerWrapper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MoreOwner"
        component={TabOwnerWrapper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SaveUseCoupon"
        component={TabOwnerWrapper}
        options={{headerShown: false}}
      />
      {/* mainOwner */}
      <Stack.Screen
        name="SettingsOwner"
        component={SettingsOwner}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddMarket"
        component={AddMarket}
        options={{headerShown: false}}
      />

      {/* 각 매장 세부 정보 */}
      <Stack.Screen
        name="MarketInfo"
        component={MarketInfo}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MarketAnalysis"
        component={MarketAnalysis}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MarketReward"
        component={MarketReward}
        options={{headerShown: false}}
      />

      {/* 이벤트 관리, 등록*/}
      <Stack.Screen
        name="EventControl"
        component={EventControl}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddEvent"
        component={AddEvent}
        options={{headerShown: false}}
      />

      {/* 매장 정보 변경 */}
      <Stack.Screen
        name="ModifyMarket"
        component={ModifyMarket}
        options={{headerShown: false}}
      />
      {/* 매장 적립/사용 내역 */}
      <Stack.Screen
        name="MarketCouponLog"
        component={MarketCouponLog}
        options={{headerShown: false}}
      />

      {/* SaveUpOwnerWrapper */}
      <Stack.Screen
        name="SaveUpOwner"
        component={SaveUpOwner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StampControl"
        component={StampControl}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="StampAmount"
        component={StampAmount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneNumScanner"
        component={PhoneNumScanner}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="QRCodeScanner"
        component={QRCodeScanner}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ModifyOwnerAccount"
        component={ModifyOwnerAccount}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ModifyOwnerPassword"
        component={ModifyOwnerPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicyOwner"
        component={PrivacyPolicyOwner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StackOwnerWrapper;

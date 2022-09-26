import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabOwnerWrapper from './TabOwnerWrapper';
import MainOwner from './MainOwner';
import SettingsOwner from './SettingsOwner';
import AddMarket from './AddMarket';
import MarketInfo from './MarketInfo';
import MarketReward from './MarketReward';
import StampAmount from './StampAmount';
import StampControl from './StampControl';
import SaveUpOwner from './SaveUpOwner';
import PhoneNumScanner from './PhoneNumScanner';
import QRCodeScanner from './QRCodeScanner';
import MoreOwner from './MoreOwner';
import EventControl from './EventControl';
import MarketAnalysis from './MarketAnalysis';
import ModifyMarket from './ModifyMarket';
import MarketCouponLog from './MarketCouponLog';
const Stack = createNativeStackNavigator();
function StackOwnerWrapper() {
  return (
    <Stack.Navigator>
      {/* 탭 눌렀을 때 */}
      <Stack.Screen
        name="Main"
        component={TabOwnerWrapper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="More"
        component={TabOwnerWrapper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SaveUseCoupon"
        component={TabOwnerWrapper}
        options={{headerShown: false}}
      />
      {/* mainOwnerWrapper */}
      <Stack.Screen
        name="MainOwner"
        component={MainOwner}
        options={{headerShown: false}}
      />

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

      <Stack.Screen
        name="EventControl"
        component={EventControl}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ModifyMarket"
        component={ModifyMarket}
        options={{headerShown: false}}
      />

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
      {/* 더보기 */}
      <Stack.Screen
        name="MoreOwner"
        component={MoreOwner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StackOwnerWrapper;

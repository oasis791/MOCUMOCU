import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Settings from './Settings';
import TabWrapper from './TabWrapper';
import ModifyUserAccount from './ModifyUserAccount';
import UseCoupon from './UseCoupon';
import RewardList from './RewardList';
import UseQR from './UseQR';

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

      {/* 더보기 스택 */}
      <Stack.Screen
        name="ModifyUserAccount"
        component={ModifyUserAccount}
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

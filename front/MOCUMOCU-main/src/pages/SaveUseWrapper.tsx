import React from 'react';
import {} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UseCoupon from './UseCoupon';
import RewardList from './RewardList';
import UseQR from './UseQR';
import SaveUseCoupon from './SaveUseCoupon';

const Stack = createNativeStackNavigator();

function SaveUse() {
  return (
    <>
      <Stack.Navigator initialRouteName="SaveUseCoupon">
        <Stack.Screen
          name="SaveUseCoupon"
          component={SaveUseCoupon}
          options={{headerShown: false}}
        />

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
    </>
  );
}

export default SaveUse;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PhoneNumScanner from './PhoneNumScanner';
import QRCodeScanner from './QRCodeScanner';

import SaveUpOwner from './SaveUpOwner';
import StampAmount from './StampAmount';
import StampControl from './StampControl';

const Stack = createNativeStackNavigator();
function SaveUpOwnerWrapper() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SaveUpOwner"
        component={SaveUpOwner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StampControl"
        component={StampControl}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="StampAmount"
        component={StampAmount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneNumScanner"
        component={PhoneNumScanner}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="QRCodeScanner"
        component={QRCodeScanner}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SaveUpOwnerWrapper;

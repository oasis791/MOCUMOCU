import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import AddMarket from './AddMarket';
import MainOwner from './MainOwner';
import MarketInfo from './MarketInfo';
import MarketReward from './MarketReward';
import SettingsOwner from './SettingsOwner';

// type MainOwnerWrapperScreenProps = NativeStackScreenProps<
//   LoggedInOwnerParamList,
//   'MainOwnerWrapper'
// >;

const Stack = createNativeStackNavigator();
function MainOwnerWrapper() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainOwner"
        component={MainOwner}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SettingsOwner"
        component={SettingsOwner}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddMarket"
        component={AddMarket}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MarketInfo"
        component={MarketInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MarketReward"
        component={MarketReward}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainOwnerWrapper;
>>>>>>> su

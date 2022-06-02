import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Main from './Main';
import Settings from './Settings';

const Stack = createNativeStackNavigator();
function MainWrapper() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainWrapper;

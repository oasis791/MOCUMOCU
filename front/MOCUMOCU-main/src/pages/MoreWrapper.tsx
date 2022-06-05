import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import More from './More';

const Stack = createNativeStackNavigator();

function MoreWrapper() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={More}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MoreWrapper;

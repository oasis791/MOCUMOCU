import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {useState} from 'react';
function Settings() {
  const [count, setCount] = useState(1);
  return (
    <View>
      <Pressable onPress={() => setCount(p => p + 1)}>
        <Text>{count}</Text>
      </Pressable>
    </View>
  );
}

export default Settings;

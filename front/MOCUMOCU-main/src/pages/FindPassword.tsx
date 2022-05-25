import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../App';

type FindPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FindPassword'
>;
function FindPassword() {
  return (
    <View>
      <Text>FindPassword</Text>
    </View>
  );
}

export default FindPassword;

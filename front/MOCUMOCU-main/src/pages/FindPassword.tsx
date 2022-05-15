import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../App';

type FindPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'findPassword'
>;
function findPassword() {
  return (
    <View>
      <Text>findPassword</Text>
    </View>
  );
}

export default findPassword;

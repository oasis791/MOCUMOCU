import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../App';

type FindIdOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FindIdOwner'
>;
function FindIdOwner() {
  return (
    <View>
      <Text>FindIdOwner</Text>
    </View>
  );
}

export default FindIdOwner;

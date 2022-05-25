import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../App';

type FindPasswordOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FindPasswordOwner'
>;
function FindPasswordOwner() {
  return (
    <View>
      <Text>FindPasswordOwner</Text>
    </View>
  );
}

export default FindPasswordOwner;

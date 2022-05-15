import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../App';

type FindPasswordOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'findIdOwner'
>;
function findPasswordOwner() {
  return (
    <View>
      <Text>findPasswordOwner</Text>
    </View>
  );
}

export default findPasswordOwner;

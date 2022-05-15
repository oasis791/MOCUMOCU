import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../App';

type FindIdOwnerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'findIdOwner'
>;
function findIdOwner() {
  return (
    <View>
      <Text>findIdOwner</Text>
    </View>
  );
}

export default findIdOwner;

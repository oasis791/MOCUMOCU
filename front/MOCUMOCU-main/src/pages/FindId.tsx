import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../App';

type FindIdScreenProps = NativeStackScreenProps<RootStackParamList, 'findId'>;
function findId() {
  return (
    <View>
      <Text>findId</Text>
    </View>
  );
}

export default findId;

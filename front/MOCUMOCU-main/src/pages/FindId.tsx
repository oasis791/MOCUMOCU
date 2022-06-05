import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../App';

type FindIdScreenProps = NativeStackScreenProps<RootStackParamList, 'FindId'>;
function FindId() {
  return (
    <View>
      <Text>FindId</Text>
    </View>
  );
}

export default FindId;
